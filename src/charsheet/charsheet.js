var LoadedChar = {}
function LoadChar( charPath ) {
    $( E ).load( "charsheet/characteristics.html", function( e ) {

    });
}



function UpdateWeapons() {
    $( '.weapon' ).each( function( i ) {
        $( this ).load( "charsheet/weapon.html", function( e ) {
            var weapon = Data[ "weapon" ][ $( this ).attr( 'weapon-id' ) ]

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
                    
                $( this ).find( '.charsheet-weapon-field-specal' ).append(`<input disabled name="specal" \
                    class="charsheet-weapon-input charsheet-weapon-input-specal" \
                    value="${Data["weapon-specal"][specal_id]["name"] + specal_x + (i === arr.length -1 ? '' : ',')}" \
                    title="${Data["weapon-specal"][specal_id]["name"] + "\n" + Data["weapon-specal"][specal_id]["description"]}" \
                    size="${Data["weapon-specal"][specal_id]["name"].length}" \
                    >`)
            });

            $( this ).find( '[name=avl]' ).val(weapon["avl"]);

            $( this ).find( '[name=name]' ).attr('title', weapon["name"] + '\n' + weapon["description"]);
        })
    });
}


function UpdateCharacteristics() {
    $( '.characteristics' ).load( "charsheet/characteristics.html", function( e ) {

    });
}