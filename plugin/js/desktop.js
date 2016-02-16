(function (PLUGIN_ID) {

    'use strict';

    // 指定されたフィールドに値が入っている場合に指定のフィールドの入力チェックを行う
    function checkRequire(event){

        var config = kintone.plugin.app.getConfig(PLUGIN_ID);   //設定を読み込む

        //設定値読み込み
        if (!config) return false;

        var record = event.record;  //レコード情報を取得

        //フィールド値を取得
        var field_1 = <設定情報から必須元フィールドコードを取得>
        var check_field_1 = <設定情報から必須対象フィールドコードを取得>

        var field_2 = (config['field-2']) ? record[config['field-2']]['value'] : "";
        var check_field_2 = (config['require-field-2']) ? record[config['require-field-2']]['value'] : "";

        if(field_1 && !check_field_1){  //フィールドパターン１の必須チェック
            <フィールドにエラーを表示> = "必須項目です";
        }

        if(field_2 && !check_field_2){  //フィールドパターン２の必須チェック
            record[config['require-field-2']].error = "必須項目です";
        }

        // event を return します。
        // エラーが有る場合は、保存はキャンセルされ、詳細画面にエラーが表示されます。
        // エラーがない場合は、保存が実行されます。
        return event;

    }

    // 登録・更新イベント(新規レコード、編集レコード、一覧上の編集レコード)
    kintone.events.on(['app.record.create.submit',
                       'app.record.edit.submit',
                       'app.record.index.edit.submit'], checkRequire);

})(kintone.$PLUGIN_ID);
