import {createHash} from 'node:crypto';
export const decode=s=>String(s||'').replace(/&#(x[\da-f]+|\d+);/gi,(_,n)=>{const c=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):+n;return c<=0x10ffff?String.fromCodePoint(c):'�'}).replace(/&(amp|quot|apos|lt|gt|nbsp);/g,(_,n)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' '})[n]);
export const plain=s=>decode(String(s||'').replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
export function attrs(tag){const a={};for(const m of tag.replace(/^<\/?[\w:-]+/,'').matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g))a[m[1].toLowerCase()]=decode(m[2]??m[3]??m[4]??'');return a;}
export function tags(html,name){return [...html.matchAll(new RegExp(`<${name}\\b(?:"[^"]*"|'[^']*'|[^'">])*>`,'gi'))].map(m=>attrs(m[0]));}
export function normalize(value,base){if(typeof value!=='string'||!value.trim())return null;try{const u=new URL(value,base);if(!['http:','https:'].includes(u.protocol)||u.username||u.password)return null;u.hash='';return u.href}catch{return null}}
export function analyse(html,url,headers={},config={}){
 const meta=tags(html,'meta'),links=tags(html,'link'),a=tags(html,'a'),get=n=>meta.filter(x=>(x.name||x['http-equiv']||'').toLowerCase()===n).map(x=>x.content||'').join(', ');
 const text=plain(html),title=plain(html.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1]||''),description=get('description'),robots=[get('robots'),get('googlebot'),headers['x-robots-tag']].filter(Boolean).join(', ');
 const hreflang=links.filter(x=>(x.rel||'').split(/\s+/).includes('alternate')&&x.hreflang).map(x=>({language:x.hreflang,url:normalize(x.href,url)}));
 const canonical=links.find(x=>(x.rel||'').split(/\s+/).includes('canonical'));
 const issues=[];const issue=(type,message,severity='warning')=>issues.push({type,message,severity});
 if(!title)issue('title','Missing page title');else if(title.length>60)issue('title','Title exceeds 60 characters','notice');
 if(!description)issue('metadata','Missing meta description');else if(description.length>160)issue('metadata','Description exceeds 160 characters','notice');
 if(/\b(noindex|none)\b/i.test(robots))issue('robots','Page has a noindex directive','notice');
 if(!get('viewport'))issue('mobile','Missing viewport meta tag');
 if(!/<html\b[^>]*\blang\s*=/i.test(html))issue('accessibility','Missing document language');
 for(const img of tags(html,'img'))if(!Object.hasOwn(img,'alt'))issue('accessibility','Image is missing an alt attribute');
 if(!/<h1\b/i.test(html))issue('headings','Missing H1');
 const structured=[];for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){if((attrs('<script '+m[1]+'>').type||'').toLowerCase()==='application/ld+json'){try{const data=JSON.parse(m[2]);structured.push(data);if(data&&!data['@context']&&!Array.isArray(data))issue('structured-data','JSON-LD has no @context')}catch{issue('structured-data','Invalid JSON-LD syntax','error')}}}
 const seen=new Set();for(const h of hreflang){if(!/^(x-default|[a-z]{2,3}(?:-[a-z0-9]{2,8})*)$/i.test(h.language))issue('hreflang',`Invalid language: ${h.language}`);if(seen.has(h.language))issue('hreflang',`Repeated language: ${h.language}`);seen.add(h.language);if(!h.url)issue('hreflang','Invalid alternate URL')}
 let sourceMatches=[];if(config.sourceSearch)sourceMatches=[...html.matchAll(new RegExp(config.sourceSearch,'gi'))].slice(0,100).map(m=>({match:m[0],offset:m.index}));
 let extraction={};for(const rule of config.extractions||[])if(rule.pattern)extraction[rule.name]=[...html.matchAll(new RegExp(rule.pattern,'gi'))].slice(0,100).map(m=>m[1]??m[0]);
 return {title,description,titleLength:title.length,descriptionLength:description.length,robots,canonical:canonical?normalize(canonical.href,url):null,hreflang,structured,amp:normalize(links.find(x=>(x.rel||'')==='amphtml')?.href,url)||(/<html\b[^>]*(?:⚡|\bamp(?:\s|=|>))/i.test(html)?url:null),wordCount:text.split(/\s+/).filter(Boolean).length,text:text.slice(0,100000),hash:createHash('sha256').update(html).digest('hex'),links:[...new Set(a.filter(x=>x.href).map(x=>normalize(x.href,url)).filter(Boolean))],issues,sourceMatches,extraction};
}
export function robotsRules(source,agent='CrawlStudio'){
 const groups=[];let group=null,started=false;
 for(let line of source.split(/\r?\n/)){line=line.replace(/#.*$/,'').trim();const m=line.match(/^([^:]+):\s*(.*)$/);if(!m)continue;const key=m[1].toLowerCase(),value=m[2].trim();if(key==='user-agent'){if(!group||started){group={agents:[],rules:[]};groups.push(group);started=false}group.agents.push(value.toLowerCase())}else if(group&&['allow','disallow'].includes(key)){started=true;if(value)group.rules.push({allow:key==='allow',path:value})}}
 const specific=groups.filter(g=>g.agents.some(a=>a!=='*'&&agent.toLowerCase().includes(a)));const rules=(specific.length?specific:groups.filter(g=>g.agents.includes('*'))).flatMap(g=>g.rules);
 return url=>{const u=new URL(url),path=u.pathname+u.search;const matches=rules.filter(r=>{const end=r.path.endsWith('$'),raw=end?r.path.slice(0,-1):r.path;const pattern=raw.replace(/[.+?^{}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*');return new RegExp('^'+pattern+(end?'$':'')).test(path)}).sort((a,b)=>b.path.replace(/\*/g,'').length-a.path.replace(/\*/g,'').length||Number(b.allow)-Number(a.allow));return !matches.length||matches[0].allow};
}
export function finalize(pages,threshold=.9){
 const hashes=new Map(),titles=new Map(),byURL=new Map(pages.map(p=>[p.url,p]));
 for(const p of pages){if(p.hash&&p.status===200){if(hashes.has(p.hash)){p.duplicateOf=hashes.get(p.hash);p.issues.push({type:'duplicate',message:'Exact HTML duplicate of '+p.duplicateOf,severity:'warning'})}else hashes.set(p.hash,p.url)}if(p.title){if(titles.has(p.title))p.issues.push({type:'title',message:'Duplicate page title',severity:'warning'});else titles.set(p.title,p.url)}
 for(const h of p.hreflang||[]){const target=byURL.get(h.url);if(target&&!(target.hreflang||[]).some(x=>x.url===p.url))p.issues.push({type:'hreflang',message:'Missing return link from '+h.url,severity:'warning'})}}
 const shingles=t=>{const words=(t||'').toLowerCase().split(/\s+/).slice(0,3000);return new Set(words.slice(0,-2).map((_,i)=>words.slice(i,i+3).join(' ')))};
 const sets=pages.map(p=>shingles(p.text));for(let i=0;i<pages.length;i++){if(sets[i].size<20||pages[i].duplicateOf)continue;for(let j=0;j<i;j++){if(sets[j].size<20)continue;let intersection=0;for(const s of sets[i])if(sets[j].has(s))intersection++;const score=intersection/(sets[i].size+sets[j].size-intersection);if(score>=threshold){pages[i].nearDuplicate={url:pages[j].url,similarity:Math.round(score*100)};pages[i].issues.push({type:'near-duplicate',message:`${Math.round(score*100)}% text similarity to ${pages[j].url}`,severity:'warning'});break}}}
 const rank=new Map(pages.map(p=>[p.url,1/Math.max(1,pages.length)]));for(let n=0;n<20;n++){const next=new Map(pages.map(p=>[p.url,.15/Math.max(1,pages.length)]));for(const p of pages){const out=(p.links||[]).filter(u=>next.has(u));if(out.length)for(const u of out)next.set(u,next.get(u)+.85*rank.get(p.url)/out.length);else for(const u of next.keys())next.set(u,next.get(u)+.85*rank.get(p.url)/pages.length)}for(const [u,v]of next)rank.set(u,v)}
 for(const p of pages){p.internalRank=+(rank.get(p.url)*100).toFixed(3);p.inlinks=pages.filter(q=>(q.links||[]).includes(p.url)).map(q=>q.url)}return pages;
}

