type Num = number | bigint;

class Duration {
  private duration = 0n;

  constructor(duration: bigint) {
    this.duration = duration;
  }

  toString() {
    const floor = (bigInt: Num) => Math.floor(Number(bigInt));
    const floorDiv = (a: Num, b: Num) => floor(BigInt(a) / BigInt(b));
    const toString =
      (duration: Num) => {
        if (1e3 > duration) {
          return `${duration}ns`;
        } else if (1e6 > duration) {
          return `${floorDiv(duration, 1e3)}μs`;
        } else if (1e9 > duration) {
          return `${floorDiv(duration, 1e6)}ms`;
        } else {
          return `${floorDiv(duration, 1e9)}s`;
        }
      };

    return toString(this.duration);
  }

  valueOf() {
    return this.duration;
  }
}

export class Timer {
  private startTime = 0;
  private endTime = 0;
  private timeTaken = 0;

  timed<T>(workFunction: () => T) {
    this.start();
    const output = workFunction();
    this.stop();

    return {
      output,
      duration: this.duration(),
    };
  }

  duration() {
    return new Duration(BigInt(this.timeTaken));
  }

  start() {
    this.startTime = performance.now();

    return this;
  }

  stop() {
    this.endTime = performance.now();

    const measurement = this.endTime - this.startTime;

    this.timeTaken = Math.round(measurement * 1_000_000);

    return this;
  }
}
