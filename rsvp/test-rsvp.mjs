import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const rows=[Array(13).fill('header')];
let failWrite=false,flushed=0;
const sheet={getLastRow:()=>rows.length,getRange(row,col,count=1,width=1){return {
 getValues:()=>rows.slice(row-1,row-1+count).map(r=>r.slice(col-1,col-1+width)),
 getValue:()=>rows[row-1]?.[col-1],
 setValues(v){if(failWrite)throw Error('storage offline');rows[row-1]=v[0];return this;},setNumberFormat(){return this;}
};}};
const context=vm.createContext({Date,JSON,String,Number,Error,SyntaxError,Array,
 LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})},
 SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{flushed++;}},
 HtmlService:{XFrameOptionsMode:{ALLOWALL:'allow'},createHtmlOutput:html=>({html,setXFrameOptionsMode(){return this;}})}
});
vm.runInContext(fs.readFileSync(new URL('./Code.gs',import.meta.url),'utf8'),context);
const payload={fullName:'Convidado de teste',contact:'TEST@example.com',attending:true,total:'2',companions:'Outra pessoa',dietary:'Vegetariana',comments:'Comentário'};
const validated=context.validateRSVP_(payload);
assert.equal(validated.contactKey,'test@example.com');
assert.equal(context.saveRSVP_(validated).updated,false);
assert.equal(rows.length,2);assert.equal(rows[1][5],2);assert.equal(flushed,1);
assert.equal(context.saveRSVP_(context.validateRSVP_({...payload,contact:'test@example.com',total:'3'})).updated,true);
assert.equal(rows.length,2);assert.equal(rows[1][5],3);
const no=context.validateRSVP_({...payload,attending:false});
assert.equal(no.total,0);assert.equal(no.dietary,'');assert.equal(no.companions,'');assert.equal(no.comments,'Comentário');
assert.equal(context.validateRSVP_({...payload,contact:'+351 912 345 678'}).contactKey,'912345678');
assert.equal(context.validateRSVP_({...payload,contact:'00351912345678'}).contactKey,'912345678');
assert.throws(()=>context.validateRSVP_({...payload,total:'0'}));
assert.throws(()=>context.validateRSVP_({...payload,total:'2.5'}));
assert.throws(()=>context.validateRSVP_({...payload,contact:'inválido'}));
assert.throws(()=>context.validateRSVP_({...payload,website:'bot'}));
assert.throws(()=>context.validateRSVP_({...payload,companions:'',children:''}));
assert.equal(context.safeCell_('=IMPORTXML("evil")'),'\'=IMPORTXML("evil")');
const nonce='a'.repeat(32);
const receipt=context.doPost({parameter:{nonce,payload:JSON.stringify(payload)}}).html;
assert(receipt.includes('"saved":true'));assert(!receipt.includes('TEST@example.com'));
failWrite=true;
const failure=context.doPost({parameter:{nonce,payload:JSON.stringify(payload)}}).html;
assert(failure.includes('"saved":false'));assert(!failure.includes('"saved":true'));
console.log('Passed: create/update, contact normalization, decline handling, validation, formula injection, private receipt, failed-save response.');
