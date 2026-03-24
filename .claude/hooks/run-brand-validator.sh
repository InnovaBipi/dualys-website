#!/bin/bash
# Wrapper for brand-color-validator.js
# Reads Claude Code hook stdin JSON, extracts file_path, passes to validator
FILE_PATH=$(node -e "let d='';process.stdin.on('data',c=>{d+=c});process.stdin.on('end',()=>{try{process.stdout.write(JSON.parse(d).tool_input?.file_path||'')}catch(e){}})")
if [ -n "$FILE_PATH" ]; then
  node .claude/hooks/brand-color-validator.js "$FILE_PATH"
fi
