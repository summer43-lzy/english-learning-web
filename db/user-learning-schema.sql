-- 用户学习数据表结构：用于后端持久化账号与学习进度。
-- current_category 限定为雅思/商务；mastered_words 使用 JSON 数组保存已掌握单词列表。
CREATE TABLE user_learning_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  current_category VARCHAR(16) NOT NULL CHECK (current_category IN ('雅思', '商务')) DEFAULT '雅思',
  mastered_words JSONB NOT NULL DEFAULT '[]'::jsonb,
  check_in_days INTEGER NOT NULL DEFAULT 0 CHECK (check_in_days >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_learning_progress_category
  ON user_learning_progress (current_category);
