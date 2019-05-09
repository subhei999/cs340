-- data manip queries for MMORPG DB
-- using the mmo database.

--item view for use in item queries
SELECT MMIT.name,MMIT.ItemLevel,MIQ.quality,MIB.Description,MIC.Classname_enUS,MISC.subclass,MII.inventoryIcon,MMIT.description
FROM mmo_itemTemplate MMIT
INNER JOIN mmo_itemBonding MIB on MIB.id = MMIT.itemBonding_id
INNER JOIN mmo_itemClass MIC on MIC.ID = MMIT.itemClass_id
INNER JOIN mmo_itemSubClass MISC on MISC.class_id = MIC.ID
INNER JOIN mmo_itemQuality MIQ on MIQ.id = MMIT.itemQuality_id
INNER JOIN mmo_itemIcon MII on MII.ID = MMIT.itemIcon_id
WHERE MISC.subclass_id = MMIT.itemSubClass_id
order by MMIT.ItemLevel desc
LIMIT 100



-- get all characters created in the MMO and display name,race,class,lvl sort by lvl
-- display this when going to Character page on website
SELECT MCH.name, MCH.lvl, MR.name as 'Race', MCL.name as 'Class' 
FROM mmo_character MCH
INNER JOIN mmo_class MCL on MCL.id = MCH.class_id
INNER JOIN mmo_race MR on MR.id = MCH.race_id
order by MCH.lvl desc;

-- filter character list based on faction order by highest rep with the faction but do not expose rep values
SELECT MCH.name, MCH.lvl, MR.name as 'Race', MCL.name as 'Class',MREP.status as 'Rep. Status'
FROM mmo_character MCH
INNER JOIN mmo_class MCL on MCL.id = MCH.class_id
INNER JOIN mmo_race MR on MR.id = MCH.race_id
INNER JOIN mmo_faction MF on MF.id = MR.faction_id
INNER JOIN mmo_reputation MREP on MREP.character_id = MCH.id
WHERE MF.name = :req.query.factionName
order by MREP.reputation desc;

-- get races in each faction
SELECT MR.name as 'Race'
FROM mmo_race MR
INNER JOIN mmo_faction MF on MF.id = MR.faction_id
WHERE MF.name = :req.query.factionName

-- get wealthiest player on the server based on aggregate vendorprice of items in inventory
SELECT MCH.name, sum(MI.vendorPrice) as 'Net Worth'
FROM mmo_character MCH
INNER JOIN mmo_inventory MINV on MINV.character_id = MCH.id
INNER JOIN mmo_item MI on MI.id = MINV.item_id
GROUP BY MCH.name
ORDER BY sum(MI.vendorPrice) desc
LIMIT 1

-- get played time and number of characters on account based on aggregate session history of characters on each account
SELECT MA.email as Account, count(MCH.id) as Characters, sum(TIMESTAMPDIFF(MINUTE,MS.login,MS.logout)) as TotalPlaytime_min
FROM mmo_session MS
RIGHT JOIN mmo_character MCH on MCH.id = MS.character_id
RIGHT JOIN mmo_account MA on MA.id = MCH.account_id
GROUP BY MA.email



--generic row delete for any table on modify tables page
DELETE FROM :req.query.tableName WHERE id = :req.query.id

--generic row insert for any table on modify tables page
INSERT INTO :req.query.tableName + (:req.query.colNames) VALUES (:req.query.colValues)

--generic row update for any table on modify tables page
UPDATE :req.query.tableName SET :req.query.colNames = :req.query.colValues WHERE id= :req.query.id

-- dis-associate an item from a characters inventory (M-to-M relationship deletion)
DELETE FROM mmo_inventory MINV WHERE MINV.character_id = :character_ID_selected AND  MINV.item_id = :item_ID_selected

-- add item to character inventory (M-to-M relationship addition)
INSERT INTO mmo_inventory MINV (character_id, item_id) VALUES (:character_id_from_dropdown_Input, :item_id_from_dropdown_Input)

-- drop down list query of all accounts used for new character creation menu
SELECT MA.email
FROM mmo_account MA
ORDER BY MA.email

-- add a new character on an account selected from drop down list
INSERT INTO mmo_character (name, race_id, class_id) VALUES (:nameInput, :raceInput, :classInput)

-- rename character
UPDATE mmo_character SET name = :nameInput  WHERE id= :character_ID_from_dropdown_Input




