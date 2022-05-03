/* 常量 */
/**
 * 音乐播放页面名称
 */
let WINDOW_PLAYER_MUSIC_NAME = "WINDOW_PLAYER_MUSIC_NAME";

/**
 * 音乐播放列表key
 */
let PLAYER_MUSIC_LIST = "player_music_list";

/**
 * 音乐播放索引key
 */
let PLAYER_MUSIC_ID = "player_music_id";

/**
 * 资源端点
 */
let RESOURCE_ENDPOINT = "//dev-courses-misuc.ixuea.com/";

/**
 * 列表循环
 */
let MODEL_LOOP_LIST = 0;

/**
 * 单曲循环
 */
let MODEL_LOOP_ONE = 1;

/**
 * 随机循环
 */
let MODEL_LOOP_RANDOM = 2;

/**
 * 每16毫秒执行一次，也就是1秒60次
 * 16毫秒是通过每秒60帧计算出来的，也就是1000/60，也就是说绘制一帧要在16毫秒中完成，不然就能感觉卡顿
 * 用于黑胶唱片旋转
 */
let MUSIC_TIMER_INTERVAL = 16;

/**
 * 每16毫秒旋转的角度
 * 360/60/16
 */
let ROTATION_PER = 0.2304;

/**
 * 最后播放的音乐的时长的key
 */
let LAST_PLAY_SONG_DURAION = "last_play_song_duraion";

/**
 * 最后播放的音乐的进度的key
 */
let LAST_PLAY_SONG_PROGRESS = "last_play_song_progress";