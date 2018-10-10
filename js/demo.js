const demp = $("#office");
const manage = {
  //当下的地址名
  addressVal: "",
  //status为当时我点击了那种按钮
  status: "",
  //要删除的那一条li
  lis: "",
  //所有数值的数组
  liArray: [],
  init: function() {
    this.dialogInit();
    this.addFunc();
    this.origiFunc();
    this.editFunc();
    this.delFunc();
  },
  dialogInit: () => {
    $("#dialogDom").dialog({
      title: "",
      width: 400,
      height: 200,
      closed: true,
      cache: false,
      modal: true,
      buttons: [
        {
          text: "确定",
          handler: function() {
            if (manage.status === "add") {
              let reg = /^[\u4E00-\u9FA5A-Za-z]{1,30}$/;
              let inputVal = $('[data-items="inputs"]').val();
              if (reg.test(inputVal)) {
                if (manage.liArray.indexOf(inputVal) < 0) {
                  manage.liArray.push(inputVal);
                  $("ul").append(
                    $("<li />", {
                      html:
                        '<input type="radio" name="radio" data-id="btn"><span data-items="span">' +
                        inputVal +
                        "</span>"
                    })
                  );
                } else {
                  alert("此地址已被添加过，请重新选择");
                  return;
                }
                if (manage.liArray.length === 0) {
                  manage.liArray.push(inputVal);
                  $("ul").append(
                    $("<li />", {
                      html:
                        '<input type="radio" name="radio" data-id="btn"><span data-items="span">' +
                        inputVal +
                        "</span>"
                    })
                  );
                }
                $("#dialogDom").dialog("close");.
              } else if (inputVal === "") {
                $.messager.alert("提示", "请输入地址");
              } else if (inputVal.length > 30) {
                $.messager.alert("提示", "字符长度不能大于30");
              } else {
                $.messager.alert("提示", "字符不合法，请输入中英文");
              }

              //$('[data-items="inputs"]').val("");
            } else if (manage.status === "edit") {
              let editVal = $("#dialogDom [data-items='inputs']").val();
              $("input[type='radio']:checked")
                .next()
                .text(editVal);
            } else if (manage.status === "delete") {
              manage.lis.remove();
              manage.liArray.splice(
                jQuery.inArray(manage.lis, manage.liArray),
                1
              );
            }
            manage.origiFunc();

            $('[data-items="inputs"]').val("");
            $('[data-btn="edit"]').hide();
            $('[data-btn="remove"]').hide();
          }
        },
        {
          text: "取消",
          handler: function() {
            $("#dialogDom").dialog("close");
          }
        }
      ]
    });
  },
  //增加
  addFunc: () => {
    $("#handleBtn")
      .find('[data-btn="add"]')
      .on("click", function() {
        manage.status = "add";
        $("#dialogDom").dialog("open");
        $('[data-items="inputs"]').val("");
        $("#content").show();
        $("#delItem").hide();
        $('#dialogDom [data-items="title"]').text("增加地址");
      });
  },
  //选择按钮
  origiFunc: () => {
    //任一check按钮点击后，其他选择按钮弹出
    $("#addClickBtn [data-id='btn']").on("click", function() {
      manage.lis = $(this).closest("li");
      $('[data-btn="edit"]').show();
      $('[data-btn="remove"]').show();
    });
  },
  //编辑按钮
  editFunc: () => {
    $('[data-btn="edit"]').on("click", function() {
      manage.status = "edit";
      $("#dialogDom").dialog("open");
      let edits = $("input[type='radio']:checked")
        .next()
        .text();
      $('#content [data-items="inputs"]').val(edits);
      $("#content").show();
      $("#delItem").hide();
      $('#dialogDom [data-items="title"]').text("编辑地址");
    });
  },
  //删除按钮
  delFunc: () => {
    $('[data-btn="remove"]').on("click", function() {
      manage.status = "delete";
      $("#dialogDom").dialog("open");
      $("#content").hide();
      $("#delItem").show();
      $('#dialogDom [data-items="title"]').text("提示");
    });
  }
};
$(function() {
  manage.init();
});
