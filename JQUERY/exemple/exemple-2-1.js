$(function(){
    function voir(){
        $('#info').addClass('info--visible')
        $('#voile').addClass('voile--visible')
    };
    $('[name="clique"]').on('click',function(){
        voir();
    });
    $('[name="survol"]').on('mouseenter',function(){
        voir();
    })
    $('#voile').on('click',function(){
        $('#info,#voile').removeClass('info--visible voile--visible')
    })
});

