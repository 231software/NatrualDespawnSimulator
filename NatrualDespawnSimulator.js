const COMMAND_NAME="simulatenatrualdespawn"
const PLUGIN_NAME="NatrualDespawnSimulator"

const ruleFile=new JsonConfigFile("plugins\\"+PLUGIN_NAME+"\\Rules.json");
ruleFile.init("whitelist",[])
ruleFile.init("blacklist",[])
ruleFile.init("scripts",[])

let maincmd=mc.newCommand(COMMAND_NAME," ",PermType.GameMasters);
maincmd.overload([]);
maincmd.setCallback(commandCallback)
maincmd.setup();

function commandCallback(cmd,origin,output,results){
    despawn();
}

function despawn(){
    mc.getAllEntities().forEach((entity)=>{
        if(ruleFile.get("whitelist").includes(entity.type))return;
        if(ruleFile.get("blacklist").includes(entity.type)){
            entity.despawn();
            return;
        }
        if(entity.getNbt().getKeys().includes("Persistent"))return;
        if(!ll.imports("EntityFamilyDetect","entityIsInFamily")(entity.type,"mob"))return;
        if(ll.imports("EntityFamilyDetect","entityIsInFamily")(entity.type,"inanimate"))return;
        entity.despawn()
    })
}
ll.exports(despawn,PLUGIN_NAME,"despawn")

ll.registerPlugin(PLUGIN_NAME,"模拟实体自然刷新清除",[0,0,1,Version.Beta],{Author:"New Moon Studio",GitHub:"https://github.com/231software//NatrualDespawnSimulator",Developers:"Minimouse"})