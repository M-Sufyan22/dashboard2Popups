$(document).ready(function() {
    $('.content-tabs-links a').click(function(e) {
        e.preventDefault();
        $('.content-tabs-links a').removeClass('active');
        $(this).addClass('active');
    });
    $('.aside__nav-multi').click(function(e) {
        if ($('body').hasClass('sidebar__toggle'))
            $(this).toggleClass('multi-show');
    });
    $('.header__nav-toggle').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('sidebar__toggle');
    });
    $('#month').change(function() {
        if ($('.content-tabs-links a.active').text() == "Employee") {
            $('.load-employees').click();
        } else {
            $('.load-customers').click();
        }
    });
    $(document).on('keyup', '.child-table__header .form-control', function(e) {
        let childTable = $(this).parents('tr').last().find('>.child-table table');
        childTable.dataTable().fnFilter(this.value);
        console.log(this.value);

    });
    $(document).on('click', '.pdf-download', function(e) {
        e.preventDefault();
        let childTableDiv = $(this).parents('tr').last().find('>.child-table .buttons-pdf').click();
    });
    $(document).on('click', '.xls-download', function(e) {
        e.preventDefault();
        let childTableDiv = $(this).parents('tr').last().find('>.child-table .buttons-excel').click();
    });
    $(document).on('click', '.select-all', function(e) {
        e.preventDefault();
        $(this).addClass('selected');
        $(this).html("Alles abwählen");
        $(this).parents('tr').last().find('>.child-table tr').addClass('active');
        $(this).parents('tr').find('.total-selected').html($(this).parents('.child-table').find('tr.active').length - 1);
    });

    $(document).on('click', '.selected', function(e) {
        e.preventDefault();
        $(this).removeClass('selected');
        $(this).html("Alles auswählen");
        $(this).parents('tr').last().find('>.child-table tr').removeClass('active');
        $(this).parents('tr').find('.total-selected').html("0");
    });
    $(document).on('click', '.clear-all', function(e) {
        e.preventDefault();
        let list = $(this).parents('tr').last().find('>.child-table tr.active');
        let del_data = [];
        let emp_data = [$(this).parents('tr').last().find('td:first-child').attr('data-itemid')];
        list.each(function() {
            let tdList = [];
            $(this).find('td').each(function() {
                tdList.push($(this).text());
            });
            tdList.shift();
            tdList.pop();
            del_data.push(tdList);
        });
        $.ajax({
            url: "ajax_calls.php",
            type: "POST",
            data: {
                del_data: del_data,
                emp_data: emp_data,
                determine: 'Mitarbeiter',
                new_del: true
            },
            cache: false,
            dataType: "json",
            success: function(response) {
                list.remove();
                alert(response);
            },
            error: function() {
                alert('An error occured');
            }
        });
    });
    $(document).on('click', '.child-table tbody tr', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parents('tr').find('.total-selected').html($(this).parents('tr').find('tr.active').length);
        // let childTableDiv = $(this).parents('tr').last().find('>.child-table .buttons-excel').click();
    });
    $(document).on('click', '.child-table__toggle', function(e) {
        e.preventDefault();
        $(this).parents('tr').last().find('>td').hide();
        $(this).parents('tr').last().find('>.child-table').show();

        let template = $('#hidden-template').html();
        let childTableDiv = $(this).parents('tr').last().find('>.child-table');

        childTableDiv.html(template);

        let parentTD = $(this).parents('td').last();
        let userName = parentTD.find('span.user-name').text();

        childTableDiv.find('span.user-name').html(userName);
        childTableDiv.find('table tbody').html("");

        let tableData = mainTableData[parentTD.attr('data-itemid')];
        tableData.forEach(function(item, index) {
            var html = "";
            html += "<tr>";
            html += '<td class="col-name"></td>';
            html += "<td class='col-tag'>" + item[1] + "</td>";
            html += "<td class='col-date'>" + item[2] + "</td>";
            html += "<td class='col-could'>" + item[3] + "</td>";
            html += "<td class='col-post'>" + item[4] + "</td>";
            html += "<td class='col-street'>" + item[5] + "</td>";
            html += "<td class='col-layer'>" + item[6] + "</td>";
            html += "<td class='col-start'>" + item[7] + "</td>";
            html += "<td class='col-end'>" + item[8] + "</td>";
            html += "<td class='col-pause'>" + item[9] + "</td>";
            html += "<td class='col-hours'>" + item[10] + "</td>";
            html += "<td class='col-status'>" + item[11] + "</td>";
            html += "</tr>";
            childTableDiv.find('table tbody').append(html);
        });
        setTimeout(() => {
            childTableDiv.find('table').dataTable({
                dom: 'Bfrtip',
                paging: false,
                search: true,
                // bFilter: false, 
                bInfo: false,
                "autoWidth": false,
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }, 500);
        let totalRows = childTableDiv.find('table tbody tr').length;
        childTableDiv.find('.entries-of').html("Entires 1 of " + totalRows);
        childTableDiv.find('.total-entries').html(totalRows);
    });
    $(document).on('click', '.chile-table__close', function(e) {
        e.preventDefault();
        $(this).parents('tr').last().find('>td').show();
        $(this).parents('tr').last().find('>td.child-table').hide();
    });
});