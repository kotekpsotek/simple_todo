// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::command;
use std::fs;

#[derive(serde::Serialize, serde::Deserialize, Debug, Default)]
struct DataJson {
  data: Vec<Point>
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct Point {
  name: String,
  done: bool
}

#[command]
/** Because tauri api performs save json in weird way by cause invalid JSON syntax without any reason */
fn save_json(cnt: Vec<Point>) {
  let mut new = DataJson::default();
  new.data = cnt;
    
  // Serialize new to JSON
  let s = serde_json::to_string(&new)
    .map_err(|_| ())
    .unwrap();

  // Save file
  fs::write("./data.json", s).map_err(|_| ())
    .unwrap();
} 

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_json])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
