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
            $( this ).find( '[name=specal]' ).val(weapon["specal"]);
            $( this ).find( '[name=avl]' ).val(weapon["avl"]);

            $( this ).find( '.weapons-head' ).attr('title', weapon["description"]);
        })
    });
}