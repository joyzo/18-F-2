jQuery.noConflict();

(function($,PLUGIN_ID) {
    "use strict";

    $(document).ready(function(){
        var conf = kintone.plugin.app.getConfig(PLUGIN_ID); //プラグインの設定情報を取得

        //フィールド情報を取得
        kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', {'app': kintone.app.getId()}, function(resp) {
            //取得したフィールド一覧をプルダウンにセット
            for (var key in resp.properties){
                    $('[name=field-1]').append($('<option>').html(resp.properties[key].label).val(resp.properties[key].code));
                    $('[name=require-field-1]').append($('<option>').html(resp.properties[key].label).val(resp.properties[key].code));
                    $('[name=field-2]').append($('<option>').html(resp.properties[key].label).val(resp.properties[key].code));
                    $('[name=require-field-2]').append($('<option>').html(resp.properties[key].label).val(resp.properties[key].code));
            }

            //既に値が設定されている場合はフィールドに値を設定する
            if(conf){
                $('[name=field-1]').val(conf['field-1']);
                $('[name=require-field-1]').val(conf['require-field-1']);
                $('[name=field-2]').val(conf['field-2']);   //設定情報を取得して設定
                $('[name=require-field-2]').val(conf['require-field-2']);
            }

        },function(error){  //一覧の取得に失敗
            alert("プラグイン設定画面の生成に失敗しました。");
            return;
        });

        //「保存する」ボタン押下時に入力情報を設定する
        $('#check-plugin-submit').click(function() {
            var config = [];
            //元フィールドとチェック先フィールドのどちらかが入力されていない場合は対のフィールドは空にセット
            config['field-1'] = $('#field-1 option:selected').val();
            config['require-field-1'] = $('#require-field-1 option:selected').val();
            config['field-2'] = ($('#require-field-2 option:selected').val()) ? $('#field-2 option:selected').val() : "";
            config['require-field-2'] = ($('#field-2 option:selected').val()) ? $('#require-field-2 option:selected').val() : "";

            kintone.plugin.app.setConfig(config);   //設定情報を保存
        });

        //「キャンセル」ボタン押下時の処理
        $('#check-plugin-cancel').click(function() {
                history.back();
        });
    });

})(jQuery,kintone.$PLUGIN_ID);
