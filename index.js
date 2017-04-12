function sleep (ms) {
  let timerId;
  let _resolve;

  const promise = new Promise(resolve => {
    let resolved = false;

    _resolve = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    timerId = setTimeout(() => {
      _resolve();
    }, ms);
  });

  promise.cancel = () => {
    clearTimeout(timerId);
    _resolve();
  };

  return promise;
}

async function run (text, opt = {}) {
  if (!text || text.length === 0) {
    return;
  }

  const {
    duration,
    delay,
    interruptable
  } = opt;

  const ctx = {
    stream: opt.stream || process.stdout,
    delay: delay || Math.ceil((duration || 700) / text.length),
    running: true,
    sleepPromise: null,
    cleanupCb: () => {}
  };

  if (!!interruptable) {
    const interrupt = () => {
      if (ctx.sleepPromise && ctx.sleepPromise.cancel) {
        ctx.sleepPromise.cancel();
      }
      ctx.running = false;
    }

    const stdinLastPausingState = process.stdin.isPaused()
                            || (!process.stdin._readableState.flowing);

    process.stdin.once('data', interrupt);

    ctx.cleanupCb = () => {
      process.stdin.removeListener('data', interrupt);
      
      if (stdinLastPausingState) {
        process.stdin.pause();
      }
    };
  }

  // Prevent breaking the lines when animating.
  process.stdin.setRawMode(true);

  for (let i in text) {
    if (!ctx.running) {
      ctx.stream.write(text.substr(i));
      break;
    }

    ctx.stream.write(text[i]);
    await sleep(ctx.delay);
  }

  process.stdin.setRawMode(false);
  ctx.cleanupCb();
}

module.exports = (text, opt) => {
  return run(text, opt);
};