export class EventEmitter2 {
  private state: any = {};

  bind(name: string, value: any) {
    if (this.state[name]) {
      this.state[name].forEach(
        (cb: any) => cb(value)
      )
    }
  }

  on(name: string, cb: () => any): any {
    if (this.state[name]) {
      this.state[name].push(cb);
    } else {
      this.state[name] = [cb];
    }

    return {
      unsubscribe: () => {
        this.state[name] = this.state[name]
          .filter((item: any) => (item !== cb));
      },
    }
  }
}
