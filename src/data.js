var Data = {
    "weapons": {},
};

const WEAPONFIELDS = [
    "name",
    "cls",
    "rng",
    "rof",
    "dam",
    "pen",
    "clip",
    "rld",
    "specal",
    "wt",
    "avl",
    "description",
]


function LoadData( dataName) {
    $.getJSON( "data/" + dataName, function( newData ){

        // ----- weapons -----
        if ("weapons" in newData) {
            newData["weapons"].forEach(weaponData => {

                // weapon dosent exist -> create new
                if (!(weaponData["id"] in Data["weapons"])){
                    Data["weapons"][weaponData["id"]] = { "id": weaponData["id"] }
                }
                // fill data
                WEAPONFIELDS.forEach( fieldname => {
                    // override but low
                    if ("override" in weaponData && weaponData["override"] < Data["weapons"][weaponData["id"]][fieldname + "-override"]) return;
                    // not override but exists
                    if (!("override" in weaponData) && fieldname in Data["weapons"][weaponData["id"]]) return;

                    Data["weapons"][weaponData["id"]][fieldname] = weaponData[fieldname];

                    if ("override" in weaponData)
                        Data["weapons"][weaponData["id"]][fieldname + "-override"] = weaponData["override"];
                    else Data["weapons"][weaponData["id"]][fieldname + "-override"] = -1;
                })
            });
        }
    });
}