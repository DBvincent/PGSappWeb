
var WritingPad = function () {

    var current = null;

    $(function () {

        initHtml();

        initSignature();
           
//      $(document).on("click", "#myEmpty", null, function () {
//          $('.js-signature').jqSignature('clearCanvas');
//
//      });

//      $(document).on("mouseover", "#myTable", null, function () {
//          if ((event.srcElement.tagName == "TD") && (current != event.srcElement)) {
//              if (current != null) { current.style.backgroundColor = current._background }
//              event.srcElement._background = event.srcElement.style.backgroundColor;
//              current = event.srcElement;
//          }
//      });

//      $(document).on("mouseout", "#myTable", null, function () {
//          if (current != null) current.style.backgroundColor = current._background
//      });

//      $(document).on("click", "#myTable", null, function () {
//          if (event.srcElement.tagName == "TD") {
//              var color = event.srcElement._background;
//              if (color) {
//                  $("input[name=DisColor]").css("background-color", color);
//                  var strArr = color.substring(4, color.length - 1).split(',');
//                  var num = showRGB(strArr);
//                  $("input[name=HexColor]").val(num);
//              }
//          }
//      });

//      $(document).on("click", "#btnSave", null, function () {
//          $('#colorpanel').css("display", "none");
//          var typeData = $("#btnSave").data("sender");
//          var HexColor = $("input[name=HexColor]").val();
//          var data = $(".js-signature").data();
//          if (typeData == "#myColor") {
//              data["plugin_jqSignature"]["settings"]["lineColor"] = HexColor;
//              $('.js-signature').jqSignature('reLoadData');
//          }
//          if (typeData == "#myBackColor") {
//
//              data["plugin_jqSignature"]["settings"]["background"] = HexColor;
//              $('.js-signature').jqSignature('reLoadData');
//          }
////      });
//      $("#mymodal").on('hide.bs.modal', function () {
//          $("#colorpanel").remove();
//          $("#mymodal").remove();
//          $("#myTable").remove();
//      });
    });

    function initHtml() {
        var html = '<div class="modal" id="mymodal">' +
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-body">' +
                        '<div class="js-signature" id="mySignature">' +
                         '</div>' +
                         '<div>' +
                         '<button type="button" class="btn btn-default" id="myEmpty">清空面板</button>' +
                         '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        $('body').append(html);
    }

    function initSignature() {
        debugger;
        if (window.requestAnimFrame) {
            var signature = $("#mySignature");
            signature.jqSignature({ width: 500, height: 200, border: '1px solid tranparent', background: '#16A085', lineColor: '#000000', lineWidth: 2, autoFit: false });
        }
    }

    function init(){}

    return {
        init: function () {
            init();
        }
    };
}