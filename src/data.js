var Data = {
    "weapon": {},
    "weapon-specal": {},
};
const FIELDS = {
    "weapon": [
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
    ],

    "weapon-specal": [
        "name",
        "description",
    ]
}


function LoadData( dataName) {
    $.getJSON( "data/" + dataName, function( newData ) {

        for (const [datatype, datafields] of Object.entries(FIELDS)) {

            // not adding data of this type
            if (!(datatype in newData)) return;

            // add data
            newData[ datatype ].forEach( dataobj => {
                // new data this new id -> create
                if (!(dataobj[ "id" ] in Data[ datatype ])) Data[ datatype ][ dataobj[ "id" ] ] = { "id": dataobj[ "id" ] }

                // fill data
                datafields.forEach( fieldname => {
                    // override but lower value
                    if ("override" in dataobj && dataobj["override"] < Data[ datatype ][ dataobj["id"]][fieldname + "-override"]) return;
                    // not override but such field already exists
                    if (!("override" in dataobj) && fieldname in Data[ datatype ][ dataobj[ "id" ] ]) return;

                    // set field value
                    Data[ datatype ][ dataobj["id"]][ fieldname ] = dataobj[ fieldname ];

                    // set override value
                    if ("override" in dataobj)
                        Data[ datatype ][ dataobj["id"]][ fieldname + "-override" ] = dataobj[ "override" ];
                    else Data[ datatype ][ dataobj["id"]][ fieldname + "-override" ] = 0;
                })
            });
        };
    });
    console.log(Data)
}