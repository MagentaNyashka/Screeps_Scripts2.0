var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader'); 
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleCenter = require('role.center');
var roleHarvesterUpgr = require('role.harvester_upgr');
var roleClaimer = require('role.claimer');
var roleBuilderM = require('role.builder_m');
var roleMinerM = require('role.miner_m');
var roleAttackerM = require('role.attacker_m');
var roleHealerM = require('role.healer_m');
var roleTransfer = require('role.transfer');
const { lastIndexOf } = require('lodash');



const targetRoom = 'E27N39';
const targetRoom_E26N39 = 'E26N39';



module.exports.loop = function () {
    Game.cpu.generatePixel();
    var PS = Game.getObjectById('62d284f2f9fa9489ab8437aa');
    PS.processPower();
    console.log(Game.gpl.progress + '/' + Game.gpl.progressTotal);
    console.log('Level: '+Game.gpl.level);
    Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].spawn(PS);
    /*
    var closestDamagedWall = Game.rooms['E27N39'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.hits < structure.hitsMax) &&
            structure.hits < 1000000;
        }
    });
    console.log(closestDamagedWall.length);
    */

    var observer = Game.getObjectById('62d5941d3207940d0232022c');
    observer.observeRoom('E26N40');
    observer.observeRoom('E27N40');
    observer.observeRoom('E28N40');
    /*
    var factory = Game.rooms['E27N39'].find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_FACTORY}
    });
    */
    var factory = Game.getObjectById('631d8315f169257f0b3fefc7');
    if(factory.store[RESOURCE_KEANIUM_BAR] < 300){
        factory.produce(RESOURCE_KEANIUM_BAR);
    }
    if(factory.store[RESOURCE_REDUCTANT] < 200){
        factory.produce(RESOURCE_REDUCTANT);
    }
    if(factory.store[RESOURCE_CONDENSATE] < 60){
        factory.produce(RESOURCE_CONDENSATE);
    }
    if(factory.store[RESOURCE_CONCENTRATE] < 40){
        factory.produce(RESOURCE_CONCENTRATE);
    }
    if(factory.store[RESOURCE_OXIDANT] < 100){
        factory.produce(RESOURCE_OXIDANT);
    }
    if(factory.store[RESOURCE_EXTRACT] < 15){
        factory.produce(RESOURCE_EXTRACT);
    }

    
    if ((Game.time % 10 == 0)){
        var terminal_E26N39 = Game.getObjectById('62e282b837a2260784177d33');
        var terminal = Game.getObjectById('6272d43e398ef897c86ef60c');
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_HYDROGEN] >= 100) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_HYDROGEN &&
                                                  order.type == ORDER_BUY &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            orders.sort(function(a,b){return b.price - a.price;});
            if (orders[0].price > 0.7) {
                var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }
        }
        if (terminal_E26N39.store[RESOURCE_ENERGY] >= 2000 && terminal_E26N39.store[RESOURCE_HYDROGEN] >= 100) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_HYDROGEN &&
                                                  order.type == ORDER_BUY &&
                                                  Game.market.calcTransactionCost(400, targetRoom_E26N39, order.roomName) < 2000);
            orders.sort(function(a,b){return b.price - a.price;});
            if (orders[0].price > 0.7) {
                var result = Game.market.deal(orders[0].id, 400, targetRoom_E26N39);
            }
        }
        /*
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_ZYNTHIUM_KEANITE] >= 50) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ZYNTHIUM_KEANITE &&
                                                  order.type == ORDER_BUY &&
                                                  Game.market.calcTransactionCost(50, targetRoom, order.roomName) < 2000);
            orders.sort(function(a,b){return b.price - a.price;});
            if (orders[0].price > 0.7) {
                var result = Game.market.deal(orders[0].id, 50, targetRoom);
                if (result == 0) {
                    console.log('Order completed successfully');
                }
            }
        }
        */
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_ZYNTHIUM] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ZYNTHIUM &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }
        }
        /*
        if (Game.resources[PIXEL] >= 10) {
            var orders = Game.market.getAllOrders(order => order.resourceType == PIXEL &&
                                                  order.type == ORDER_BUY);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 10);
            }
        }
        */
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_KEANIUM] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_KEANIUM &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }

        }
        /*
        if ((Game.time % 10 == 0)){
            if (terminal.store[RESOURCE_ENERGY] < 20000) {
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY &&
                                                      order.type == ORDER_SELL &&
                                                      Game.market.calcTransactionCost(1000, targetRoom, order.roomName) < 2000);
                if(orders.length != 0){
                    orders.sort(function(a,b){return b.price - a.price;});
                    var result = Game.market.deal(orders[0].id, orders[0].amount, targetRoom);
                    if(result == -6){
                        Game.market.deal(orders[0].id, 2000, targetRoom);
                    }
                }

            }
        }
        */
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_UTRIUM] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_UTRIUM &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
              orders.sort(function(a,b){return b.price - a.price;});
              var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }
        }
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_LEMERGIUM] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_LEMERGIUM &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }
        }
        /*
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_UTRIUM_ALKALIDE] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_UTRIUM_ALKALIDE &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }
        }
        */
        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_OXYGEN] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_OXYGEN &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 400, targetRoom);
            }
        }

        if (terminal.store[RESOURCE_ENERGY] >= 2000 && terminal.store[RESOURCE_POWER] <= 10) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_POWER &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(1000, targetRoom, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 1000, targetRoom);
            }
        }
    


        if (terminal_E26N39.store[RESOURCE_ENERGY] >= 2000 && terminal_E26N39.store[RESOURCE_CATALYZED_GHODIUM_ACID] <= 200) {
            var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_CATALYZED_GHODIUM_ACID &&
                                                  order.type == ORDER_SELL &&
                                                  Game.market.calcTransactionCost(400, targetRoom_E26N39, order.roomName) < 2000);
            if(orders.length != 0){
                orders.sort(function(a,b){return b.price - a.price;});
                var result = Game.market.deal(orders[0].id, 400, targetRoom_E26N39);
            }
        }


    }
    
    var controller = Game.getObjectById('5bbcae7b9099fc012e639264');
    const linkFrom = Game.rooms['E27N39'].lookForAt('structure', 44, 16)[0];
    const linkTo = Game.rooms['E27N39'].lookForAt('structure', 29, 36)[0];
    linkFrom.transferEnergy(linkTo);
    const linkFromUpgr = Game.rooms['E27N39'].lookForAt('structure', 10, 5)[0];
    const linkToUpgr = Game.rooms['E27N39'].lookForAt('structure', 9, 33)[0];
    
    if(controller.ticksToDowngrade >= 198000){
        linkFromUpgr.transferEnergy(linkTo);
        linkTo.transferEnergy(linkToUpgr);
    }
    else{
        linkFromUpgr.transferEnergy(linkToUpgr);
    }

    const linkFrom_E26N37 = Game.getObjectById('62dd9014409ee7fb6d9823cf');
    const linkTo_E26N37 = Game.getObjectById('62de9d898a8620f8c222b40e');
    const linkFromUpgr_E26N37 = Game.getObjectById('62f00ee7ec828a100fdc8d2f');
    linkFrom_E26N37.transferEnergy(linkTo_E26N37);
    linkTo_E26N37.transferEnergy(linkFromUpgr_E26N37);

    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    /*
    Границы ключ переломлен пополам
    А наш батюшка Ленин совсем усоп
    Он разложился на плесень и на липовый мёд
    А перестройка всё идёт и идёт по плану
    И вся грязь превратилась в голый лёд
    И всё идёт по плану
    Всё идёт по плану
    А моя судьба захотела на покой
    Я обещал ей не участвовать в военной игре
    Но на фуражке, на моей, серп и молот, и звезда
    Как это трогательно: серп и молот, и звезда
    Лихой фонарь ожидания мотается
    И всё идёт по плану
    Всё идёт по плану
    А моей женой накормили толпу
    Мировым кулаком растоптали ей грудь
    Всенародной свободой растерзали ей плоть
    Так закопайте ж её во Христе
    И всё идёт по плану
    Всё идёт по плану
    Один лишь дедушка Ленин хороший был вождь
    А все другие остальные такое дерьмо
    А все другие враги и такие дураки
    Над родною, над Отчизной бесноватый снег шёл
    Я купил журнал "Корея" — там тоже хорошо
    Там товарищ Ким Ир Сен, там то же, что у нас
    Я уверен, что у них то же самое
    И всё идёт по плану
    Всё идёт по плану
    А при коммунизме всё будет заебись
    Он наступит скоро, надо только подождать
    Там всё будет бесплатно, там всё будет в кайф
    Там, наверное, вообще не надо будет умирать
    Я проснулся среди ночи и понял, что
    Всё идёт по плану
    Всё идёт по плану
    А всё идёт по плану
    Всё идёт по плану
    Всё
    */
    var my_spawns = ['Spawn1','Spawn2','Spawn3','Spawn4','Spawn5','Spawn6','Spawn7','Spawn8','Spawn9','Spawn10','Spawn11'];
    
    _.forEach(my_spawns, function(room_spawn){
        var towers = Game.spawns[room_spawn].room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_TOWER}
        })
        _.forEach(towers, function(tower){
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART &&
                        structure.hits < structure.hitsMax);
                    }
            });
            var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.hits < structure.hitsMax) &&
                    structure.hits < 1000000;
                }
            });
            if(closestDamagedStructure || closestDamagedWall) {
                if(tower.store[RESOURCE_ENERGY] > 0){
                    tower.repair(closestDamagedStructure);
                    if(!closestDamagedStructure && tower.store[RESOURCE_ENERGY] > 200){
                        tower.repair(closestDamagedWall);
                    }
                }
            }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
                Game.notify(Game.spawns[room_spawn].room + '_UNDER ATTACK!')
            }
        });






        var controller = Game.spawns[room_spawn].room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_CONTROLLER}
        });
        var extantions = Game.spawns[room_spawn].room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_EXTENSION}
        });
        var links = Game.spawns[room_spawn].room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_LINK}
        });
        var sources = Game.spawns[room_spawn].room.find(FIND_SOURCES);
        var constr_sites = Game.spawns[room_spawn].room.find(FIND_CONSTRUCTION_SITES);
        if(extantions.length < 5 || controller[0].level == 1){
            var Harvester_BP = [WORK,WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,CARRY,CARRY,MOVE];
            var maxBuilders = 1;
            var maxCenters = 0;
            var CenterBP = [CARRY, MOVE];
            var maxHarvestersUpgr = 0;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        if(extantions.length < 10 && extantions.length >= 5 && controller[0].level >= 2){
            var Harvester_BP = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
            var maxBuilders = 2;
            var maxCenters = 0;
            var CenterBP = [CARRY, MOVE];
            var maxHarvestersUpgr = 1;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];

        }
        if(extantions.length < 20 && extantions.length >= 10 && controller[0].level >= 3){
            var Harvester_BP = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
            var maxCenters = 0;
            var CenterBP = [CARRY, MOVE];
            var maxHarvestersUpgr = 0;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        if(extantions.length < 30 && extantions.length >= 20 && controller[0].level >= 4){
            var Harvester_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
            var maxCenters = 0;
            var CenterBP = [CARRY, MOVE];
            var maxHarvestersUpgr = 0;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        if(extantions.length < 40 && extantions.length >= 30 && controller[0].level >= 5){
            var Harvester_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
            var maxCenters = 1;
            var CenterBP = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxHarvestersUpgr = 1;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        if(extantions.length < 50 && extantions.length >= 40 && controller[0].level >= 6){
            var Harvester_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
            var maxCenters = 1;
            var CenterBP = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxHarvestersUpgr = 1;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        if(extantions.length < 60 && extantions.length >= 50 && controller[0].level >= 7){
            var Harvester_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxHarvesters = 1;
            var Ugrader_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxUpgraders = 1;
            var Builder_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
            var maxCenters = 1;
            var CenterBP = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxHarvestersUpgr = 1;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        if(extantions.length >= 60 && controller[0].level >= 8){
            var Harvester_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE];
            var maxHarvesters = 1;
            var Ugrader_BP = [WORK,CARRY,MOVE];
            var maxUpgraders = 1;
            var Builder_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
            var maxCenters = 1;
            var CenterBP = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var maxHarvestersUpgr = 1;
            var HarvesterUpgr_BP = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
        var testIfCanSpawn = Game.spawns[room_spawn].spawnCreep(Harvester_BP, 'dry',
        { dryRun: true });
        var testIfCanSpawnC = Game.spawns[room_spawn].spawnCreep(CenterBP, 'dry',
        { dryRun: true });
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == Game.spawns[room_spawn].room);
        if(harvesters.length < maxHarvesters && testIfCanSpawn == 0){
            var newHarvesterName = 'H_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep(Harvester_BP, newHarvesterName,
                {memory: {role: 'harvester'}});
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == Game.spawns[room_spawn].room);
        if(upgraders.length < maxUpgraders && harvesters.length == maxHarvesters){
            var newUpgraderName = 'U_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep(Ugrader_BP, newUpgraderName,
                {memory: {role: 'upgrader'}});
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == Game.spawns[room_spawn].room);
        if(builders.length < maxBuilders && harvesters.length == maxHarvesters && constr_sites.length > 0){
            var newBuilderName = 'B_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep(Builder_BP, newBuilderName,
                {memory: {role: 'builder'}});
        }
        var centers = _.filter(Game.creeps, (creep) => creep.memory.role == 'center' && creep.room == Game.spawns[room_spawn].room);
        if(centers.length < maxCenters && links.length >= 2 && testIfCanSpawnC == 0){
            var newCenterName = 'C_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep(CenterBP, newCenterName,
                {memory: {role: 'center'}});
        }
        var harvester_upgr = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_upgr' && creep.room == Game.spawns[room_spawn].room);
        if(harvester_upgr.length < maxHarvestersUpgr && harvesters.length == maxHarvesters && links.length >= 3) {
            var newHarvesterUpgrName = 'HU_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep(HarvesterUpgr_BP, newHarvesterUpgrName,
                {memory: {role: 'harvester_upgr'}});
        }
        if(harvesters.length < 1 && testIfCanSpawn == -6){
            var newHarvesterName = 'H_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep([WORK,CARRY,MOVE], newHarvesterName,
                {memory: {role: 'harvester'}});
        }
        if(centers.length < 1 && testIfCanSpawnC == -6){
            var newCenterName = 'C_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep([CARRY,MOVE], newCenterName,
                {memory: {role: 'center'}});
        }
        
    });
    
    


    
    /*
    if(PC.enableRoom(PC.room.controller) == ERR_NOT_IN_RANGE && PC.room.controller.isPowerEnabled == false){
        PC.moveTo(PC.room.controller);
    }
    */
    var PCs = Game.rooms['E27N39'].find(FIND_MY_POWER_CREEPS);
    if(PCs.length > 0){
        Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].usePower(PWR_GENERATE_OPS);
        var extantions = Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return(
                    structure.structureType == STRUCTURE_TERMINAL ||
                    structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] > 0;
                }
            });
        var realExtansions = Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return(
                    structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity() > 0;
                }
            });
        var extantion = Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].pos.findClosestByRange(extantions);
        var factory = Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return(structure.structureType == STRUCTURE_FACTORY);
            }
        });
        /*
        if(Game.powerCreeps['E27N39_MAIN'].usePower(PWR_OPERATE_EXTENSION, extantion) == ERR_NOT_IN_RANGE && realExtansions.length != 0){
            Game.powerCreeps['E27N39_MAIN'].moveTo(extantion);
        }
        */
        
        if(Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].usePower(PWR_OPERATE_FACTORY, factory) == ERR_NOT_IN_RANGE && Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].store[RESOURCE_OPS] >= 100 && factory.level != 4){
            Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].moveTo(factory);
        }
        /*
        if(Game.powerCreeps['E27N39_MAIN'].usePower(PWR_OPERATE_TOWER, tower) == ERR_NOT_IN_RANGE){
            Game.powerCreeps['E27N39_MAIN'].moveTo(tower);
        }
        */
        else{
            Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].usePower(PWR_GENERATE_OPS);
        }
    }
    
    
    
    
    
    
    
    

    


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'center') {
            roleCenter.run(creep);
        }
        if(creep.memory.role == 'harvester_upgr') {
            roleHarvesterUpgr.run(creep);
        }
        if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'builder_m') {
            roleBuilderM.run(creep);
        }
        if(creep.memory.role == 'miner_m') {
            roleMinerM.run(creep);
        }
        if(creep.memory.role == 'attacker_m') {
            roleAttackerM.run(creep);
        }
        if(creep.memory.role == 'healer_m') {
            roleHealerM.run(creep);
        }
        if(creep.memory.role == 'transfer') {
            roleTransfer.run(creep);
        }
    }
    console.log('OK!')
}