// META: title=NativeIO API: Written bytes are read back.
// META: global=window,worker
// META: script=resources/support.js

'use strict';

promise_test(async testCase => {
  await reserveAndCleanupCapacity(testCase);

  const writtenBytes = [64, 65, 66, 67];
  const file = await createFile(testCase, 'test_file', writtenBytes);

  const readSharedArrayBuffer = new SharedArrayBuffer(writtenBytes.length);
  const readBytes = new Uint8Array(readSharedArrayBuffer);
  const readCount = await file.read(readBytes, 0);
  assert_equals(readCount, 4,
                'NativeIOFile.read() should return the number of bytes read');

  assert_array_equals(readBytes, writtenBytes,
                      'the bytes read should match the bytes written');
}, 'NativeIOFile.read returns bytes written by NativeIOFile.write');
