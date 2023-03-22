function UpdateWeapons() {
    $( '.weapon' ).each( function( i ) {
        $( this ).load( "obj/weapon.html", function( e ) {
            var weapon = Data[ "weapon" ][ $( this ).attr( 'weapon-id' ) ]

            $( this ).find( '[name=name]' ).val(weapon["name"]);
            $( this ).find( '[name=cls]' ).val(weapon["cls"]);
            $( this ).find( '[name=rng]' ).val(weapon["rng"]);
            $( this ).find( '[name=rof]' ).val(weapon["rof"]);
            $( this ).find( '[name=dam]' ).val(weapon["dam"]);
            $( this ).find( '[name=pen]' ).val(weapon["pen"]);
            $( this ).find( '[name=clip]' ).val(weapon["clip"]);
            $( this ).find( '[name=rld]' ).val(weapon["rld"]);
            $( this ).find( '[name=wt]' ).val(weapon["wt"]);
            // Specal
            weapon["specal"].forEach((specal_id, i, arr) => {
                if (specal_id.match(/ \(\d+\)$/)){
                    specal_x = specal_id.match(/ \(\d+\)$/)[0];
                    specal_id = specal_id.slice(0, specal_id.length - specal_x.length ) + ' (X)';
                } else {
                    specal_x = '';
                }
                    
                console.log(specal_x, specal_id)
                $( this ).find( '.weapons-field-specal' ).append(`<input disabled name="specal" \
                    value="${Data["weapon-specal"][specal_id]["name"] + specal_x + (i === arr.length -1 ? '' : ',')}" \
                    title="${Data["weapon-specal"][specal_id]["description"]}" \
                    size="${Data["weapon-specal"][specal_id]["name"].length}" \
                    >`)
            });

            $( this ).find( '[name=avl]' ).val(weapon["avl"]);

            $( this ).find( '[name=name]' ).attr('title', weapon["description"]);
        })
    });
}
