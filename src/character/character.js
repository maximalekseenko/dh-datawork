var OpenededChar = {}


function characterLoadList () {
    // clear current list
    $( '.list' ).empty();

    // fill list with characters
    fs.readdirSync ( './char/' ).forEach( filename => {
        $.getJSON('./char/' + filename, function ( data ) {
            $( '.list' ).append(`<button \
                class="listitem character-listitem" \
                onclick="characterOpenChar('${'./char/' + filename}')" \
                >${filename}</button>`
            );
        })
    })  
}


function characterLoadChar ( file ) { $.getJSON( file.path, function( newData ) { characterSaveChar ( newData ) } ) }


function characterSaveChar ( data ) {
    var filenameI = '';

    // check if file does not exist
    if ( ! ( fs.existsSync( './char/' + data[ "name" ] + filenameI) ) || confirm( "Character with such name already exists.\nDo you want to save a new one?" ) ) {
        while ( fs.existsSync( './char/' + data[ "name" ] + filenameI) ) { filenameI = Number( filenameI ) + 1; };
        fs.writeFileSync( './char/' + data[ "name" ] + filenameI + ".char", JSON.stringify ( data ) );
        characterLoadList();
    }

    characterOpenChar ( './char/' + data[ "name" ] + filenameI);
}


function characterOpenChar ( filename ) {
    $.getJSON( filename, function( data ) { OpenededChar = data; } );

    $( '.character-window' ).load( "character/charsheet.html", function() {
        characterUpdateWeapon(); 
        characterUpdateCharacteristics();
    } );
}


function characterUpdateWeapon() {
    OpenededChar["weapons"].forEach( function( weaponid ) {
        $( '.character-weapons' ).append($('<div>').load( "character/weapon.html", function() {
            var weapon = Data[ "weapon" ][ weaponid ];

            $( this ).find( '[name=name]' ).val(weapon["name"]);
            $( this ).find( '[name=cls]' ).val(weapon["cls"]);
            $( this ).find( '[name=rng]' ).val(weapon["rng"]);
            $( this ).find( '[name=rof]' ).val(weapon["rof"]);
            $( this ).find( '[name=dam]' ).val(weapon["dam"]);
            $( this ).find( '[name=pen]' ).val(weapon["pen"]);
            $( this ).find( '[name=clip]' ).val(weapon["clip"]);
            $( this ).find( '[name=rld]' ).val(weapon["rld"]);
            $( this ).find( '[name=wt]' ).val(weapon["wt"] + 'kg');
            // Specal
            weapon["specal"].forEach((specal_id, i, arr) => {

                // specal (X)
                if (specal_id.match(/ \(\d+\)$/)){
                    specal_x = specal_id.match(/ \(\d+\)$/)[0];
                    specal_id = specal_id.slice(0, specal_id.length - specal_x.length ) + ' (X)';
                } else specal_x = '';
                    
                $( this ).find( '.character-weapon-field-specal' ).append(`<input disabled name="specal" \
                    class="character-weapon-input character-weapon-input-specal" \
                    value="${Data["weapon-specal"][specal_id]["name"] + specal_x + (i === arr.length -1 ? '' : ',')}" \
                    title="${Data["weapon-specal"][specal_id]["name"] + "\n" + Data["weapon-specal"][specal_id]["description"]}" \
                    size="${Data["weapon-specal"][specal_id]["name"].length}" \
                    >`)
            });

            $( this ).find( '[name=avl]' ).val(weapon["avl"]);

            $( this ).find( '[name=name]' ).attr('title', weapon["name"] + '\n' + weapon["description"]);
        }))
    });
}


function characterUpdateCharacteristics() {
    $( '.character-characteristics' ).load( "character/characteristics.html", function( e ) {

    });
}