const roll = remote.getGlobal('roll');

// change plus and minus for dropdown items
$('.collapse').on('shown.bs.collapse', function() {
    $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
}).on('hidden.bs.collapse', function() {
    $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
});

// Allow use of enter/return key for calculator
$(document).ready(function(){
    $('#calc-display').keypress(function(event){
      if(event.keyCode==13)
      $('#calc-eval').click();
    });
});

// Evaluate a die roll
function die_eval(exp) {
    var parser = new roll.ExpressionTree();

    parser.set_expression(exp);

    return parser.parse_expression();
}

// Allow drag
function drag(event) {
    event.dataTransfer.setData("src", event.target.id);
}

// Allow drop
function allowDrop(event) {
    event.preventDefault();
}

// Swap two items when dragged on top of
function swapDrop(event) {
  event.preventDefault ();
  var src = document.getElementById(event.dataTransfer.getData ("src"));
  var srcParent = src.parentNode;
  var target = event.currentTarget.firstElementChild;

  event.currentTarget.replaceChild(src, target);
  srcParent.appendChild(target);
}

// Update the value of two swapped items
function updateVal(curr, value) {
    curr.attr("draggable", false);
    $(curr).html('<input class="editing" type="text" value="' + value + '" />');
    $(".editing").focus();
    $(".editing").keyup(function (event) {
        if (event.keyCode == 13) {
            $(curr).html($(".editing").val().trim());
            curr.attr("draggable", true);
        }
    });

    $(document).click(function () {
        var toTrim = $(".editing");
        if (typeof toTrim.val() != 'undefined') {
            $(curr).html($(".editing").val().trim());
            curr.attr("draggable", true);
            return;
        }
    });
}

// allow user to edit a div buy giving it the editable class
$(document).ready(function () {
    $("div.editable").dblclick(function (event) {
        event.stopPropagation();
        var curr = $(this);
        var value = $(this).html();
        updateVal(curr, value);
    });
});

// This code should open external links in the systems default browser
var shell = require('electron').shell;
//open links externally by default
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});