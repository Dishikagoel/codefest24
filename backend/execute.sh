#!/bin/bash

out=$(timeout --foreground 10 python3 test.py)
#sleep 10
status=$?

if [ $status -eq 124 ]; then
  echo 'Time'
  json_string='{"Fail":"RuntimeError"}'
elif [ $status -eq 0 ]; then
  echo 'SUCCESS'
  json_string='{"Success":"'$out'"}'
else
  echo "fail"
  json_string='{"Fail":"'$out'"}'
fi

#touch "out.json"
echo "$json_string" > "out.json"
