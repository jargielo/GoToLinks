const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../enhancements.js'),'utf8');
const code=source.slice(source.indexOf('const encoder=new TextEncoder();'),source.indexOf('function offlineViewer(source)'));
const context={TextEncoder,Uint8Array,DataView,files:[['polskie.txt','Zażółć gęślą jaźń'],['icons/test.bin',new Uint8Array([0,255,128])]]};
vm.createContext(context);vm.runInContext(code+';result=makeZIP(files)',context);
const bytes=context.result,view=new DataView(bytes.buffer);
assert.equal(view.getUint32(0,true),0x04034b50);
assert.equal(view.getUint16(6,true),0x800);
assert.equal(view.getUint16(12,true),33); // Valid DOS date: 1980-01-01.
const end=bytes.length-22;assert.equal(view.getUint32(end,true),0x06054b50);assert.equal(view.getUint16(end+8,true),2);
const central=view.getUint32(end+16,true);assert.equal(view.getUint32(central,true),0x02014b50);assert.equal(view.getUint16(central+14,true),33);
if(process.argv[2])fs.writeFileSync(process.argv[2],bytes);
console.log('PASS: ZIP signatures, UTF-8 names, valid timestamps, entry count and central directory.');
