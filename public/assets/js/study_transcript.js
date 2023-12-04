/* ------------------------------------------------------------------------------
 *
 *  # Task list view
 *
 *  Demo JS code for task_manager_list.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var TaskManagerList = function () {


    //
    // Setup components
    //

    // Datatable
    var _componentDatatable = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Create an array with the values of all the input boxes in a column
        $.fn.dataTable.ext.order['dom-text'] = function (settings, col) {
            return this.api().column(col, {order:'index'}).nodes().map( function (td, i) {
                return $('input', td).val();
            });
        };
         
        // Create an array with the values of all the select options in a column
        $.fn.dataTable.ext.order['dom-select'] = function (settings, col) {
            return this.api().column(col, {order:'index'}).nodes().map( function (td, i) {
                return $('select', td).val();
            });
        };

        // Apply custom style to select
        $.extend( $.fn.dataTableExt.oStdClasses, {
            "sLengthSelect": "custom-select"
        });

        // Initialize data table
        $('.tasks-list').DataTable({
            autoWidth: false,
            responsive: true,
            columnDefs: [
                {
                    // type: "natural",
                    width: 20,
                    targets: 0,
                    orderable: false
                },
                {
                    orderable: false,
                    targets: 1,
                    width: '10%',
                },
                {
                    width: '40%',
                    targets: 2,
                    orderable: false
                },
                {
                    width: '10%',
                    targets: [3,4,5],
                    class: 'text-center',
                    orderable: false
                },
                // {
                //     orderDataType: 'dom-text',
                //     type: 'string',
                //     targets: 4
                // },
                // {
                //     orderDataType: 'dom-select',
                //     type: 'string',
                //     targets: 5
                // },
                { 
                    orderable: false,
                    targets: 6
                },
                // {
                //     width: '15%',
                //     targets: [4, 5, 6]
                // }
            ],
            // order: [[ 0, 'desc' ]],
            dom: 'rt',
            // dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
            },
            // lengthMenu: [ 15, 25, 50, 75, 100 ],
            displayLength: 25,
            drawCallback: function (settings) {
                // var api = this.api();
                // var rows = api.rows({page:'current'}).nodes();
                // var last=null;
     
                // Grouod rows
                // api.column(1, {page:'current'}).data().each(function (group, i) {
                //     if (last !== group) {
                //         $(rows).eq(i).before(
                //             '<tr class="table-active table-border-double"><td colspan="8" class="font-weight-semibold">'+group+'</td></tr>'
                //         );
     
                //         last = group;
                //     }
                // });
            }
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatable();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    TaskManagerList.init();
});

(function($, document, window, viewport){

    var highlightBox = function( className ) {
        $(className).addClass('active');
    }

    // var highlightBoxes = function() {
    //     $('.comparison-operator').removeClass('active');

    //     if( viewport.is("<=sm") ) {
    //         highlightBox('.box-1');
    //     }

    //     if( viewport.is("md") ) {
    //         highlightBox('.box-2');
    //     }

    //     if( viewport.is(">md") ) {
    //         highlightBox('.box-3');
    //     }
    // }

    // Executes once whole document has been loaded
    $(document).ready(function() {

        // highlightBoxes();

        console.log('Current breakpoint:', viewport.current());

    });

    $(window).resize(
        viewport.changed(function(){
            highlightBoxes();

            console.log('Current breakpoint:', viewport.current());
        })
    );

})(jQuery, document, window, ResponsiveBootstrapToolkit);