function doGet(e) {
    // タイムスタンプの取得
    const timestamp = e.parameter.timestamp;
    // timestamp を date 型に変換する
    // もし timestamp が undefined などの場合は 現在の時刻の date 型 を生成
    const date = timestamp ? new Date(parseInt(timestamp)) : new Date();

    // GoogleカレンダーID（日本の祝日カレンダー）
    const calendarId = 'ja.japanese#holiday@group.v.calendar.google.com';

    // 今日のイベントを取得
    const events = CalendarApp.getCalendarById(calendarId).getEventsForDay(date);

    // 祝日かどうかを判定
    const isHoliday = events.length > 0;

    // 土日かどうかを判定
    const isWeekend = (date.getDay() === 0 || date.getDay() === 6);

    // JSON 生成
    const res_json = JSON.stringify({
        "isHoliday": isHoliday,
        "isWeekend": isWeekend
    });

    Logger.log(`date: ${date}`);
    Logger.log(`json: ${res_json}`);

    // クライアントに 生成した JSON を結果を返す
    return ContentService.createTextOutput(res_json).setMimeType(ContentService.MimeType.JSON);
}