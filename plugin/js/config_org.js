jQuery.noConflict();

(function($,PLUGIN_ID) {
    "use strict";

    $(document).ready(function(){
        var conf = kintone.plugin.app.getConfig(PLUGIN_ID); //プラグインの設定情報を取得

        //既に値が設定されている場合はフィールドに値を設定する
        if (conf){
            $('#field-1').val(conf['field-1']);
            $('#require-field-1').val(conf['require-field-1']);
            $('#field-2').val(conf['field-2']);
            $('#require-field-2').val(conf['require-field-2']);
        }

        //「保存する」ボタン押下時に入力情報を設定する
        $('#check-plugin-submit').click(function() {
            var config = [];
            //元フィールドとチェック先フィールドのどちらかが入力されていない場合は対のフィールドは空にセット
            config['field-1'] = $('#field-1').val();
            config['require-field-1'] = $('#require-field-1').val();
            config['field-2'] = ($('#require-field-2').val()) ? $('#field-2').val() : "";
            config['require-field-2'] = ($('#field-2').val()) ? $('#require-field-2').val() : "";

            kintone.plugin.app.setConfig(config);   //設定情報を保存
        });

        //「キャンセル」ボタン押下時の処理
        $('#check-plugin-cancel').click(function() {
                history.back();
        });
    });

})(jQuery,kintone.$PLUGIN_ID);
