var Data = {
    "weapons": [],
};

function LoadData( dataName) {
    $.getJSON( "data/" + dataName, function( newData ){

        // ----- weapons -----
        if ("weapons" in newData) {
            newData["weapons"].forEach(weaponData => {
                Data["weapons"]["id"] = weaponData;
            });
        }
    });
}