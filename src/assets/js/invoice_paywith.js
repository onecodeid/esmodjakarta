$(document).ready(function() {

    $('.nav-pills li.nav-item').each(function (x) {
        $(this).click(function() {
            // console.log($(this).find('radio'))
            $('input[type=radio][name=radio_payment]').prop("checked", false)
            $(this).find('input[type=radio]').prop("checked", true)
        })
    })

    $('input[type=radio][name=radio_payment]:eq(0)').prop("checked", true)
});