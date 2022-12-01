var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader'); 
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleCenter = require('role.center');
var roleHarvesterUpgr = require('role.harvester_upgr');
var roleWarrior = require('role.warrior');
var roleClaimer = require('role.claimer');
var roleBuilderM = require('role.builder_m');
var roleMinerM = require('role.miner_m');
var roleAttackerM = require('role.attacker_m');
var roleHealerM = require('role.healer_m');
var roleTransfer = require('role.transfer');
const { lastIndexOf } = require('lodash');

var maxHarvesters_E27N39 = 1;
var maxAttacker_M_E27N39 = 0;
var maxHealer_M_E27N39 = 0;
var maxUpgraders_E27N39 = 1;
var maxBuilders_E27N39 = 2;
var maxMiners_E27N39 = 1;
var maxCenter_E27N39 = 1;
var maxHarvestersUpgr_E27N39 = 1;
//
var maxClaimer = 1;
var maxBuilder_M = 0;
var maxMiners_M_E27N39 = 0;
var maxTransfers_E27N39 = 1;
//
var maxHarvesters_E26N39 = 2;
var maxUpgraders_E26N39 = 1;
var maxBuilders_E26N39 = 1;
var maxCenter_E26N39 = 1;
var maxMiners_E26N39 = 1;
//
var maxHarvesters_E26N38 = 2;
var maxCenter_E26N38 = 0;
//
var maxHarvesters_E27N38 = 2;
var maxUpgraders_E27N38 = 2;
var maxBuilders_E27N38 = 1;
//

//H 556
//U 556
//B 444
//HU 777
//E 243

//H [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]
//U [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
//HU [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]
//C [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
//C [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
//CL [CLAIM,MOVE,MOVE]
//BM [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
//B [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
//M [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]



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

    


    





    var towers_E27N39 = Game.rooms['E27N39'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });
    var towers_E26N39 = Game.rooms['E26N39'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });
    var towers_E26N38 = Game.rooms['E26N38'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });
    var towers_E27N38 = Game.rooms['E27N38'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });
    
    _.forEach(towers_E27N39, function(tower){
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
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            Game.notify('E27N39_UNDER ATTACK!')
        }
        if(closestDamagedStructure || closestDamagedWall && !closestHostile) {
            if(tower.store[RESOURCE_ENERGY] > 600){
                tower.repair(closestDamagedStructure);
                if(!closestDamagedStructure){
                    tower.repair(closestDamagedWall);
                }
            }
        }
    });
    
    _.forEach(towers_E26N39, function(tower_E26N39){
        var closestDamagedStructure = tower_E26N39.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType != STRUCTURE_WALL &&
                    structure.structureType != STRUCTURE_RAMPART &&
                    structure.hits < structure.hitsMax);
                }
        });
        var closestDamagedWall = tower_E26N39.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return(structure.hits < structure.hitsMax) &&
                structure.hits < 1000000;
            }
        });
        if(closestDamagedStructure || closestDamagedWall) {
            if(tower_E26N39.store[RESOURCE_ENERGY] > 0){
                tower_E26N39.repair(closestDamagedStructure);
                if(!closestDamagedStructure){
                    tower_E26N39.repair(closestDamagedWall);
                }
            }
        }
        var closestHostile = tower_E26N39.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower_E26N39.attack(closestHostile);
            Game.notify('E26N39_UNDER ATTACK!')
        }
    });

    _.forEach(towers_E26N38, function(tower_E26N38){
        var closestDamagedStructure = tower_E26N38.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType != STRUCTURE_WALL &&
                    structure.structureType != STRUCTURE_RAMPART &&
                    structure.hits < structure.hitsMax);
                }
        });
        var closestDamagedWall = tower_E26N38.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return(structure.hits < structure.hitsMax) &&
                structure.hits < 1000000;
            }
        });
        if(closestDamagedStructure || closestDamagedWall) {
            if(tower_E26N38.store[RESOURCE_ENERGY] > 0){
                tower_E26N38.repair(closestDamagedStructure);
                if(!closestDamagedStructure){
                    tower_E26N38.repair(closestDamagedWall);
                }
            }
        }
        var closestHostile = tower_E26N38.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower_E26N38.attack(closestHostile);
            Game.notify('E26N38_UNDER ATTACK!')
        }
    });

    _.forEach(towers_E27N38, function(tower_E27N38){
        var closestDamagedStructure = tower_E27N38.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType != STRUCTURE_WALL &&
                    structure.structureType != STRUCTURE_RAMPART &&
                    structure.hits < structure.hitsMax);
                }
        });
        var closestDamagedWall = tower_E27N38.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return(structure.hits < structure.hitsMax) &&
                structure.hits < 1000000;
            }
        });
        if(closestDamagedStructure || closestDamagedWall) {
            if(tower_E27N38.store[RESOURCE_ENERGY] > 0){
                tower_E27N38.repair(closestDamagedStructure);
                if(!closestDamagedStructure){
                    tower_E27N38.repair(closestDamagedWall);
                }
            }
        }
        var closestHostile = tower_E27N38.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower_E27N38.attack(closestHostile);
            Game.notify('E27N38_UNDER ATTACK!')
        }
    });
    
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

    
    var zLab = Game.getObjectById("62d13471f319f22aaed658ce");
    var kLab = Game.getObjectById("62a5233f875df90a4ea2576a");
    var zkLab = Game.getObjectById("629f6a71aad9e479ce9ddb94");
    var uLab = Game.getObjectById('62a7fe22d78d6e0577d2347c');
    var lLab = Game.getObjectById('62ab2f1f00db9fe0cfe039fc');
    var ulLab = Game.getObjectById('627e6c9a3da25077c4530841');
    var ghLab = Game.getObjectById('62d1cc51db46af21be01b5d5');
    var bLab = Game.getObjectById('62d4c9d27d34ce0fbbf5b300');
    var boostLab = Game.getObjectById('62e46fcabac167e54855a804');
    zkLab.runReaction(zLab, kLab);
    ulLab.runReaction(uLab, lLab);
    ghLab.runReaction(ulLab, zkLab);

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == '[room E27N39]');
    var harvester = bLab.pos.findClosestByRange(harvesters);
    bLab.boostCreep(harvester);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == '[room E26N39]');
    var upgrader = boostLab.pos.findClosestByRange(upgraders);
    boostLab.boostCreep(upgrader);
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    spawns_E27N39 = Game.rooms['E27N39'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });
    spawns_E26N39 = Game.rooms['E26N39'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });
    spawns_E26N38 = Game.rooms['E26N38'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });
    spawns_E27N38 = Game.rooms['E27N38'].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });
    var creeps_E27N39 = Game.rooms['E27N39'].find(FIND_MY_CREEPS);
    var creeps_E26N39 = Game.rooms['E26N39'].find(FIND_MY_CREEPS);
    var creeps_E26N38 = Game.rooms['E26N38'].find(FIND_MY_CREEPS);
    var creeps_E27N38 = Game.rooms['E27N38'].find(FIND_MY_CREEPS);
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
    //var spawns = [Game.getObjectById('63829c421b7320d271d5c6b5')];
    var my_spawns = ['Spawn9', 'Spawn10', 'Spawn6'];
    
    _.forEach(my_spawns, function(room_spawn){
        
        var controller = Game.spawns[room_spawn].room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_CONTROLLER}
        });
        var extantions = Game.spawns[room_spawn].room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_EXTENSION}
        });
        console.log(extantions.length)
        var constr_sites = Game.spawns[room_spawn].room.find(FIND_CONSTRUCTION_SITES);
        console.log("fffg" + extantions)
        if(extantions.length < 5){
            var Harvester_BP = [WORK,WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,CARRY,CARRY,MOVE]
            var maxBuilders = 1;
        }
        if(extantions.length < 10){
            var Harvester_BP = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]
            var maxBuilders = 2;
        }
        if(extantions.length < 20){
            var Harvester_BP = [WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK, CARRY, MOVE]
            var maxBuilders = 1;
        }
        if(extantions.length < 30){
            var Harvester_BP = [WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK, CARRY, MOVE]
            var maxBuilders = 1;
        }
        if(extantions.length < 40){
            var Harvester_BP = [WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK, CARRY, MOVE]
            var maxBuilders = 1;
        }
        if(extantions.length < 50){
            var Harvester_BP = [WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK, CARRY, MOVE]
            var maxBuilders = 1;
        }
        if(extantions.length < 60){
            var Harvester_BP = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
            var maxBuilders = 1;
        }
        if(extantions.length >= 60){
            var Harvester_BP = [WORK,CARRY,MOVE];
            var maxHarvesters = 2;
            var Ugrader_BP = [WORK,CARRY,MOVE];
            var maxUpgraders = 2;
            var Builder_BP = [WORK, CARRY, MOVE]
            var maxBuilders = 1;
        }
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == Game.spawns[room_spawn].room);
        console.log(Game.spawns[room_spawn].room + " " + harvesters.length);
        if(harvesters.length < maxHarvesters){
            console.log('spawn');
            var newHarvesterName = 'H_2.0_' + Game.time + "_" + Game.spawns[room_spawn].room;
            Game.spawns[room_spawn].spawnCreep(Harvester_BP, newHarvesterName,
                {memory: {role: 'harvester'}});
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == Game.spawns[room_spawn].room);
        if(upgraders.length < maxUpgraders && harvesters.length > 0){
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
        
    });
    
    
    
    
    
    
    _.forEach(spawns_E27N39, function(spawn_E27N39){
        var testIfCanSpawn = spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], 'dry',
        { dryRun: true });
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == '[room E27N39]');
        var bLab = Game.getObjectById('62d4c9d27d34ce0fbbf5b300');
        if(harvesters.length < maxHarvesters_E27N39 && bLab.store[RESOURCE_UTRIUM_ALKALIDE] < 90 || bLab.store[RESOURCE_ENERGY] < 300 && testIfCanSpawn == 0){
            var newHarvesterName = 'E27N39_H_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newHarvesterName,
                {memory: {role: 'harvester', boosted: true}});
        }
        if(harvesters.length < maxHarvesters_E27N39 && bLab.store[RESOURCE_UTRIUM_ALKALIDE] >= 90 && bLab.store[RESOURCE_ENERGY] >= 300 && testIfCanSpawn == 0){
            var newHarvesterName = 'E27N39_H_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newHarvesterName,
                {memory: {role: 'harvester', boosted: false}});
        }
        if(creeps_E27N39.length == 0 || testIfCanSpawn != 0 && harvesters.length < maxHarvesters_E27N39){
            var newHarvesterName = 'E27N39_H_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,CARRY,MOVE], newHarvesterName,
                {memory: {role: 'harvester', boosted: true}});
        }
        var centers = _.filter(Game.creeps, (creep) => creep.memory.role == 'center' && creep.room == '[room E27N39]');
        if(centers.length < maxCenter_E27N39 && harvesters.length >= maxHarvesters_E27N39){
            var newCenterName = 'E27N39_C_' + Game.time;
            spawn_E27N39.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newCenterName,
                {memory: {role: 'center'}});
        }
        if(creeps_E27N39.length <= 1 && centers.length < maxCenter_E27N39){
            var newCenterName = 'E27N39_C_' + Game.time;
            spawn_E27N39.spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newCenterName,
                {memory: {role: 'center'}});
        }
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == '[room E27N39]');
        var constr_site = Game.rooms['E27N39'].find(FIND_CONSTRUCTION_SITES);
        if(builder.length < maxBuilders_E27N39 && harvesters.length == maxHarvesters_E27N39 && constr_site != 0) {
            var newBuilderName = 'E27N39_B_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newBuilderName,
                {memory: {role: 'builder'}});
        }
        var harvester_upgr = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_upgr' && creep.room == '[room E27N39]');
        if(harvester_upgr.length < maxHarvestersUpgr_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newHarvesterUpgrName = 'E27N39_HU_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newHarvesterUpgrName,
                {memory: {role: 'harvester_upgr'}});
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == '[room E27N39]');
        if(upgraders.length < maxUpgraders_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newUpgraderName = 'E27N39_U_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], newUpgraderName,
                {memory: {role: 'upgrader'}});
        }
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room == '[room E27N39]');
        if(miners.length < maxMiners_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newMinerName = 'E27N39_M_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newMinerName,
                {memory: {role: 'miner'}});
        }
        var miners_m = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner_m');
        if(miners_m.length < maxMiners_M_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newMinerMName = 'E27N39_MM_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newMinerMName,
                {memory: {role: 'miner_m'}});
        }
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        if(claimer.length < maxClaimer && harvesters.length == maxHarvesters_E27N39) {
            var newClaimerName = 'E27N39_CL_' + Game.time;
            spawn_E27N39.spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newClaimerName,
                {memory: {role: 'claimer'}});
        }
        var builder_m = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder_m');
        if(builder_m.length < maxBuilder_M && harvesters.length == maxHarvesters_E27N39) {
            var newBuilderMName = 'E27N39_BM_' + Game.time;
            spawn_E27N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newBuilderMName,
                {memory: {role: 'builder_m'}});
        }
        var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
        if(transfers.length < maxTransfers_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newTransferName = 'E27N39_T_' + Game.time;
            spawn_E27N39.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newTransferName,
                {memory: {role: 'transfer'}});
        }
        var attackers_m = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker_m');
        if(attackers_m.length < maxAttacker_M_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newAttackerMName = 'E27N39_AM_' + Game.time;
            spawn_E27N39.spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newAttackerMName,
                {memory: {role: 'attacker_m'}});
        }
        var healer_m = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer_m');
        if(healer_m.length < maxHealer_M_E27N39 && harvesters.length == maxHarvesters_E27N39) {
            var newHealerMName = 'E27N39_HM_' + Game.time;
            spawn_E27N39.spawnCreep([HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newHealerMName,
                {memory: {role: 'healer_m'}});
        }
    });
    
    _.forEach(spawns_E26N39, function(spawn_E26N39){
        var testIfCanSpawn = spawn_E26N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'dry',
        { dryRun: true });
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == '[room E26N39]');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == '[room E26N39]');
        if(creeps_E26N39.length == 0 || testIfCanSpawn != 0 && harvesters.length < maxHarvesters_E26N39){
            var newHarvesterName = 'E26N39_H_' + Game.time;
            spawn_E26N39.spawnCreep([WORK,CARRY,MOVE], newHarvesterName,
                {memory: {role: 'harvester'}});
        }
        if(upgraders.length < maxUpgraders_E26N39 && harvesters.length == maxHarvesters_E26N39) {
            var newUpgraderName = 'E26N39_U_' + Game.time;
            spawn_E26N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newUpgraderName,
                {memory: {role: 'upgrader', boosted: false}});
        }
        var centers = _.filter(Game.creeps, (creep) => creep.memory.role == 'center' && creep.room == '[room E26N39]');
        if(centers.length < maxCenter_E26N39 && harvesters.length >= maxHarvesters_E26N39){
            var newCenterName = 'E26N39_C_' + Game.time;
            spawn_E26N39.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newCenterName,
                {memory: {role: 'center'}});
        }
        if(creeps_E26N39.length == 1 && harvesters.length != 0){
            var newCenterName = 'E26N39_C_' + Game.time;
            spawn_E26N39.spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newCenterName,
                {memory: {role: 'center'}});
        }
        if(harvesters.length < maxHarvesters_E26N39 && testIfCanSpawn == 0) {
            var newHarvesterName = 'E26N39_H_' + Game.time;
            spawn_E26N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newHarvesterName,
                {memory: {role: 'harvester'}});      
        }
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room == '[room E26N39]');
        if(miners.length < maxMiners_E26N39 && harvesters.length == maxHarvesters_E26N39) {
            var newMinerName = 'E26N39_M_' + Game.time;
            spawn_E26N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newMinerName,
                {memory: {role: 'miner'}});
        }

        
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == '[room E26N39]');
        var constr_site = Game.rooms['E26N39'].find(FIND_CONSTRUCTION_SITES);
        if(builder.length < maxBuilders_E26N39 && harvesters.length == maxHarvesters_E26N39 && constr_site != 0) {
            var newBuilderName = 'E26N39_B_' + Game.time;
            spawn_E26N39.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newBuilderName,
                {memory: {role: 'builder'}});
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
       var tower = Game.powerCreeps['CERTIFIED FORKLIFT DRIVER'].pos.findClosestByRange(towers_E27N39);
        
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