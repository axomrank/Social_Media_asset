import fs from 'node:fs/promises';
import path from 'node:path';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
import { chapters } from './reels_data.mjs';

const outDir='/home/angsuman/extra_spac/AXOMRANK/outputs/axomrank_90_reels';
await fs.mkdir(outDir,{recursive:true});
const order=['TOFU','MOFU','TOFU','BOFU','TOFU','MOFU','TOFU','MOFU','BOFU','TOFU'];
const chapterNames=['Introduce AxomRank','Build participation','Return to practice'];
const priority={
 TOFU:['The actual welcome to AxomRank','The first page of preparation','The book opens after work','The silhouette you recognise','A saved post meets a blank notebook'],
 MOFU:['The three-question diagnostic','Percentage base clinic','Ratio shares need a total','Average means total over count'],
};
const records=[];
for(let ch=0;ch<3;ch++){
 const queues=Object.fromEntries(['TOFU','MOFU','BOFU'].map(s=>[s,chapters[ch].filter(r=>r[0]===s)]));
 if(ch===0) for(const [s,titles] of Object.entries(priority)) queues[s].sort((a,b)=>{
  const ai=titles.indexOf(a[1]),bi=titles.indexOf(b[1]);return(ai<0?99:ai)-(bi<0?99:bi);
 });
 for(let n=0;n<30;n++){
  const r=queues[order[n%10]].shift();if(!r)throw Error('Stage queue empty');
  const [stage,title,pillar,alt,narration,visuals,text,prereq,caption,keywords]=r;
  const audio=narration.split('|'),shots=visuals.split('|'),screen=text.split('|');
  const words=audio.join(' ').split(/\s+/).length;
  // Allocate the middle 23 seconds in proportion to words; hook and CTA stay fixed.
  const middleWords=audio.slice(1,4).map(s=>s.split(/\s+/).length);
  const middleTotal=middleWords.reduce((a,b)=>a+b,0);
  const exact=middleWords.map(w=>23*w/middleTotal),dur=exact.map(Math.floor);
  let left=23-dur.reduce((a,b)=>a+b,0);
  const rem=exact.map((v,i)=>({i,f:v-dur[i]})).sort((a,b)=>b.f-a.f);
  for(let i=0;i<left;i++)dur[rem[i].i]++;
  const bounds=[0,3,3+dur[0],3+dur[0]+dur[1],26,30];
  const id=`AR${String(records.length+1).padStart(3,'0')}`;
  const beats=audio.map((s,i)=>`${String(bounds[i]).padStart(2,'0')}–${String(bounds[i+1]).padStart(2,'0')}s\nVISUAL: ${shots[i]}\nSAY: ${s}\nTEXT: ${screen[i]}`);
  const sources=[...new Set(prereq.match(/S[1-5]/g)||[])].join(', ');
  const style=stage==='BOFU'?'Real screen demo':pillar.includes('life')||pillar==='Community story'?'Creator scene + voiceover':pillar.includes('GK')?'GK card + source reveal':pillar.includes('Community')||pillar==='Brand continuity'?'Creator-led invitation':'Overhead props + voiceover';
  const pattern=stage==='BOFU'?'Show the route':pillar.includes('life')||pillar==='Community story'?'Recognisable moment':pillar.includes('GK')?'Identify before reveal':pillar.includes('Community')?'Participation prompt':/check|clinic|source|provenance|trust|method|explanation/i.test(pillar)?'Missing step reveal':'Attempt before reveal';
  const tag=pillar.includes('GK')||pillar.includes('place')?'#AssamGK':pillar.includes('life')||pillar.includes('Community')?'#AssamAspirants':stage==='BOFU'?'#ExamPractice':'#StudyPractice';
  records.push({id,sequence:records.length+1,chapter:ch+1,stage,title,pillar,alt,audio,shots,screen,prereq,caption,keywords,words,beats,sources,style,pattern,tags:`#AxomRank #AssamExams ${tag}`});
 }
}
if(records.length!==90||new Set(records.map(r=>r.title)).size!==90)throw Error('90 distinct records required');
for(const s of ['TOFU','MOFU','BOFU'])if(records.filter(r=>r.stage===s).length!==({TOFU:45,MOFU:27,BOFU:18})[s])throw Error('Mix mismatch');
for(const r of records){
 if(r.audio.length!==5||r.shots.length!==5||r.screen.length!==5)throw Error(`Beat mismatch ${r.id}`);
 if(r.words<50||r.words>70)throw Error(`Voiceover length ${r.id}: ${r.words}`);
 if(r.audio[0].split(/\s+/).length>=15||r.alt.split(/\s+/).length>=15)throw Error(`Hook too long ${r.id}`);
 if(r.audio.join(' ').match(/hey guys|let.s dive in|in this video|game.chang|mind.blow|guaranteed selection/i))throw Error(`Copy quality ${r.id}`);
}
const wb=Workbook.create();
const plan=wb.worksheets.add('Reel Plan');
const scripts=wb.worksheets.add('Scripts and Shots');
const guide=wb.worksheets.add('Guide and Mix');
const palette={maroon:'#80151A',charcoal:'#292929',ivory:'#F7F2EC',green:'#3F6B4F',light:'#FAF8F5'};

function base(sheet,lastCol,lastRow,widths){
 sheet.showGridLines=false;
 sheet.getRange(`A1:${lastCol}${lastRow}`).format={font:{name:'Arial',size:11,color:palette.charcoal},verticalAlignment:'top',wrapText:true};
 widths.forEach((w,i)=>sheet.getRangeByIndexes(0,i,lastRow,1).format.columnWidthPx=w);
 sheet.getRange(`A2:${lastCol}2`).format.rowHeight=28;
 sheet.getRange('A2').format.font={name:'Arial',size:16,bold:true,color:palette.charcoal};
 sheet.getRange('A2').format.wrapText=false;
 sheet.getRange(`A3:${lastCol}3`).format.rowHeight=30;
 sheet.getRange('A3').format.font={italic:true,color:'#666666'};
 sheet.getRange('A3').format.wrapText=false;
}
function tableStyle(sheet,lastCol,count,name){
 const t=sheet.tables.add(`A5:${lastCol}${count+5}`,true,name);t.showFilterButton=true;
 const header=sheet.getRange(`A5:${lastCol}5`);
 header.format={fill:palette.maroon,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',verticalAlignment:'center',wrapText:true,rowHeight:38};
 header.format.borders={insideVertical:{style:'thin',color:'#FFFFFF'}};
 for(let r=6;r<=count+5;r++)sheet.getRange(`A${r}:${lastCol}${r}`).format.fill=r%2===0?'#FFFFFF':palette.ivory;
 sheet.freezePanes.freezeRows(5);sheet.freezePanes.freezeColumns(1);
 return t;
}

base(plan,'R',95,[78,72,90,82,180,255,290,255,255,170,210,285,185,260,100,285,400,110]);
plan.tabColor=palette.maroon;
plan.getRange('A2').values=[['AxomRank 90 Reel Ideas']];
plan.getRange('A3').values=[['Ordered Reel sequence • 30 seconds each • hooks in columns G–I • complete filming scripts on the next sheet']];
plan.getRange('A5:R5').values=[['Reel ID','Order','Chapter','Funnel','Pillar','Reel idea','Visual hook 0–3s','Verbal hook 0–3s','Alternate verbal hook','Hook approach','Recording format','Single CTA 26–30s','Thumbnail text','Caption opening','Keywords','Hashtags','Before filming','Fact source IDs']];
plan.getRange('A6:R95').values=records.map(r=>[r.id,r.sequence,r.chapter,r.stage,r.pillar,r.title,r.shots[0],r.audio[0],r.alt,r.pattern,r.style,r.audio[4],r.screen[0],r.caption,r.keywords,r.tags,r.prereq,r.sources||'Original / brand brief']);
tableStyle(plan,'R',90,'AxomRankReelPlan');
plan.getRange('A6:R95').format.rowHeight=96;
plan.getRange('B6:C95').setNumberFormat('0');
plan.getRange('B6:D95').format.horizontalAlignment='center';
plan.getRange('G6:I95').format.font={name:'Arial',size:11,bold:true,color:palette.maroon};
plan.getRange('D6:D95').conditionalFormats.add('containsText',{text:'TOFU',format:{fill:'#EEE4D6',font:{color:'#5C4933',bold:true}}});
plan.getRange('D6:D95').conditionalFormats.add('containsText',{text:'MOFU',format:{fill:'#E6EFE8',font:{color:palette.green,bold:true}}});
plan.getRange('D6:D95').conditionalFormats.add('containsText',{text:'BOFU',format:{fill:'#F4E3E4',font:{color:palette.maroon,bold:true}}});
plan.getRange('Q6:Q95').conditionalFormats.add('containsText',{text:'Conditional:',format:{fill:'#FFF1CF',font:{color:'#6A4B10'}}});

base(scripts,'K',95,[78,250,84,445,330,350,400,375,330,85,110]);
scripts.tabColor=palette.charcoal;
scripts.getRange('A2').values=[['AxomRank 30 Second Scripts and Shots']];
scripts.getRange('A3').values=[['Read column D for the complete voiceover. Columns E–I show timed visuals, spoken lines and screen text. Use the primary hook as written.']];
scripts.getRange('A5:K5').values=[['Reel ID','Reel idea','Duration sec','Complete voiceover','Opening 0–3s','Context beat','Lesson / demonstration beat','Payoff beat','CTA 26–30s','Words','Target words/min']];
scripts.getRange('A6:K95').values=records.map(r=>[r.id,r.title,30,r.audio.join(' '),...r.beats,r.words,null]);
scripts.getRange('K6').formulas=[['=J6*60/C6']];scripts.getRange('K6:K95').fillDown();
tableStyle(scripts,'K',90,'AxomRankReelScripts');
scripts.getRange('A6:K95').format.rowHeight=150;
scripts.getRange('C6:C95').setNumberFormat('0');scripts.getRange('J6:K95').setNumberFormat('0');
scripts.getRange('C6:C95').format.horizontalAlignment='center';
scripts.getRange('J6:K95').format.horizontalAlignment='right';
scripts.getRange('E6:E95').format.font={name:'Arial',size:11,bold:true,color:palette.maroon};

base(guide,'D',50,[250,800,100,170]);
guide.tabColor='#AD8B79';
guide.getRange('A2').values=[['AxomRank Reel Sequence and Funnel Mix']];
guide.getRange('A3').values=[['90 ideas and written scripts • three chapters • English narration drafts • no publication dates assigned']];
guide.getRange('A5:D5').values=[['Funnel','Purpose','Reels','Share']];
guide.getRange('A6:B9').values=[['TOFU','Recognition, discovery and approachable participation'],['MOFU','Evaluate teaching through methods, explanations and review'],['BOFU','Start a real product task, inspect access or make a relevant enquiry'],['Total','All planned Reels']];
guide.getRange('C6').formulas=[['=COUNTIFS(\'Reel Plan\'!$D$6:$D$95,A6)']];guide.getRange('C6:C8').fillDown();
guide.getRange('C9').formulas=[['=SUM(C6:C8)']];
guide.getRange('D6').formulas=[['=C6/$C$9']];guide.getRange('D6:D9').fillDown();
guide.getRange('C6:C9').setNumberFormat('0');guide.getRange('D6:D9').setNumberFormat('0%');
guide.getRange('A12:D12').values=[['Chapter','Progression','Reels','Sequence']];
guide.getRange('A13:D15').values=chapterNames.map((name,i)=>[i+1,name,30,`${i*30+1}–${i*30+30}`]);
guide.getRange('A18:D18').values=[['Each chapter','TOFU','MOFU','BOFU']];
guide.getRange('A19:A21').values=[[1],[2],[3]];
for(let row=19;row<=21;row++) for(let col=1;col<=3;col++){
 const stage=['TOFU','MOFU','BOFU'][col-1],letter=['B','C','D'][col-1];
 guide.getRange(`${letter}${row}`).formulas=[[`=COUNTIFS('Reel Plan'!$C$6:$C$95,$A${row},'Reel Plan'!$D$6:$D$95,${letter}$18)`]];
}
const notes=[
 ['Posting order','Use the Order column as a sequence, not an obligation to publish daily. Each 10-Reel block contains 5 TOFU, 3 MOFU and 2 BOFU.'],
 ['Recording target','All storyboards total 30 seconds. Voiceovers contain 59–70 words, targeting 118–140 words per minute over the full Reel. Rehearse once; let visuals fill remaining time.'],
 ['Timed beats','The hook stays at 0–3 seconds and the CTA at 26–30 seconds. Middle beat durations vary with script length. Time labels appear in each shot cell.'],
 ['Alternate hooks','The alternate verbal hook is a replacement for the first line, not an extra line. The timed script uses the primary hook. Rehearse again after substituting.'],
 ['Quiz pauses','Single-question beats allow a brief reveal hold. Multi-question Reels explicitly ask viewers to pause the Reel to attempt the set.'],
 ['Language','Scripts are in English. For Assamese delivery, translate the whole narration and screen text, preserve the working, and have a fluent reader check the wording and final typography.'],
 ['Visual identity','Use 9:16 framing, maroon #80151A, charcoal #292929 and ivory #F7F2EC. Keep important text clear of Instagram interface overlays. Start on the hook action, then use a small Rang Ghar mark.'],
 ['Audio','Keep speech clear. Desk sounds, paper flips, timer taps or tea-cup sounds can support the opening action. Use a quiet licensed music bed if needed; no specific trending track is assumed.'],
 ['Product prerequisites','BOFU scripts specify real routes and current access details. Amber prerequisite cells mark named tools or language/PYQ routes that require a live-feature check before filming.'],
 ['Accuracy','Maths and reasoning questions are original practice. GK source IDs are listed below. Do not add exam-cycle rules, selection claims, fabricated results, prices or scarcity.'],
 ['Participation','Creator scenes are demonstrations. Obtain consent before using identifiable student submissions or results. The screenplay does not claim that suggested interactions have already happened.'],
 ['If a feature is absent','Keep the 45/27/18 allocation by replacing an unavailable BOFU tool demo with an actual practice-start or support-enquiry Reel. A manual teaching tutorial with a save CTA belongs in MOFU.']
];
guide.getRange('A24:B35').values=notes;
guide.getRange('A38:B38').values=[['Source ID','Source and supported use']];
guide.getRange('A39:B45').values=[
 ['B1','AxomRank Brand Identity Guide, October 2026. Brand positioning, languages, colours, tagline and documented product vocabulary. Supplied project document.'],
 ['B2','AxomRank Instagram Content Strategy for Assam, 9 October 2026. Community approach, funnel split, publication and truthfulness standards. Supplied project document.'],
 ['S1','Sivasagar district administration — Rang Ghar. Supports Sivasagar location and pavilion use for recreation and sports. https://sivasagar.assam.gov.in/index.php/tourist-place-detail/276'],
 ['S2','Assam Tourism — Kaziranga National Park. Supports the park’s familiar association with the Indian one-horned rhinoceros. https://assamtourism.gov.in/Kaziranga.php'],
 ['S3','UNESCO — Manas Wildlife Sanctuary. Supports the Himalayan foothill setting used as the location clue. https://whc.unesco.org/en/list/338/'],
 ['S4','Majuli district administration — District at a glance. Supports Majuli’s connection to the Brahmaputra river. https://majuli.assam.gov.in/about-district/district-glance'],
 ['S5','UNESCO — Kaziranga National Park. Supports the World Heritage inscription year 1985; this is not the park’s establishment date. https://whc.unesco.org/en/list/337/']
];
for(const row of [5,12,18,38])guide.getRange(`A${row}:${row===38?'B':'D'}${row}`).format={fill:palette.maroon,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},rowHeight:32,verticalAlignment:'center',horizontalAlignment:'center'};
guide.getRange('A6:D9').format.rowHeight=30;
guide.getRange('A13:D15').format.rowHeight=30;
guide.getRange('A19:D21').format.rowHeight=28;
guide.getRange('A24:B35').format.rowHeight=46;
guide.getRange('A39:B45').format.rowHeight=58;
guide.getRange('A24:A35').format.font={name:'Arial',size:11,bold:true,color:palette.charcoal};
guide.getRange('C6:D9').format.horizontalAlignment='right';
guide.getRange('A9:D9').format.font={name:'Arial',size:11,bold:true,color:palette.charcoal};

wb.recalculate();
const summary=await wb.inspect({kind:'table',range:'\'Guide and Mix\'!A5:D21',include:'values,formulas',tableMaxRows:17,tableMaxCols:4,maxChars:5000});
console.log(summary.ndjson);
const err=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:30},summary:'Final formula error scan'});
console.log(err.ndjson);
const sample=await wb.inspect({kind:'table',range:'\'Scripts and Shots\'!J6:K7',include:'values,formulas',tableMaxRows:2,tableMaxCols:2,maxChars:1000});console.log(sample.ndjson);
const file=await SpreadsheetFile.exportXlsx(wb);await file.save(path.join(outDir,'AxomRank_90_Reel_Ideas_and_30_Second_Scripts.xlsx'));
await fs.writeFile(path.join(outDir,'content_validation.json'),JSON.stringify({count:records.length,mix:{TOFU:45,MOFU:27,BOFU:18},minWords:Math.min(...records.map(r=>r.words)),maxWords:Math.max(...records.map(r=>r.words)),uniqueTitles:90,records:records.map(r=>({id:r.id,title:r.title,stage:r.stage,words:r.words}))},null,2));
for(const [name,range,filename] of [
 ['Guide and Mix','A2:D21','guide_preview.png'],
 ['Guide and Mix','A24:B35','guide_notes_preview.png'],
 ['Reel Plan','F5:I8','hooks_preview.png'],
 ['Reel Plan','A5:F8','plan_preview.png'],
 ['Scripts and Shots','B5:E7','script_preview.png'],
 ['Scripts and Shots','F5:I7','shots_preview.png']
]){
 const preview=await wb.render({sheetName:name,range,scale:1,format:'png'});
 await fs.writeFile(path.join(outDir,filename),new Uint8Array(await preview.arrayBuffer()));
}
console.log(JSON.stringify({output:path.join(outDir,'AxomRank_90_Reel_Ideas_and_30_Second_Scripts.xlsx'),reels:records.length}));
