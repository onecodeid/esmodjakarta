/* ------------------------------------------------------------------------------
 *
 *  # Invoice archive
 *
 *  Demo JS code for invoice_archive.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

const InvoiceArchive = function() {


    //
    // Setup module components
    //

    // Datatable
    const _componentDatatable = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Initialize
        $('.table-scoring').DataTable({
            responsive: true,
            autoWidth: false,
            columnDefs: [
                {
                    width: '10%', targets: 0, orderable: false
                },
                {
                    width: '15%', targets: [1], orderable: false
                },
                {
                    width: '30%', targets: [2], orderable: false
                },
                // { 
                //     orderable: false,
                //     width: 120,
                //     targets: 7
                // },
                {
                    width: '15%',
                    targets: [5, 3], orderable: false
                },
                {
                    width: '15%',
                    targets: 4, orderable: false
                },
                // {
                //     width: '15%',
                //     targets: 3
                // }
            ],
            // order: [[ 0, 'desc' ]],
            dom: 'rtp',
            // dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
            },
            // dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
            // language: {
            //     search: '<span class="me-3">Filter:</span> <div class="form-control-feedback form-control-feedback-end flex-fill">_INPUT_<div class="form-control-feedback-icon"><i class="ph-magnifying-glass opacity-50"></i></div></div>',
            //     searchPlaceholder: 'Type to filter...',
            //     lengthMenu: '<span class="me-3">Show:</span> _MENU_',
            //     paginate: { 'first': 'First', 'last': 'Last', 'next': document.dir == "rtl" ? '&larr;' : '&rarr;', 'previous': document.dir == "rtl" ? '&rarr;' : '&larr;' }
            // },
            // lengthMenu: [ 25, 50, 75, 100 ],
            // displayLength: 25,
            // drawCallback: function ( settings ) {
            //     const api = this.api();
            //     const rows = api.rows( {page:'current'} ).nodes();
            //     let last = null;
            // }
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
    InvoiceArchive.init();

    // Default initialization
    $('.select').select2({
        minimumResultsForSearch: Infinity
    });
});