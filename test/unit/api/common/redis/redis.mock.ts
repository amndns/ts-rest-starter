class RedisMock {
  public result: string;

  public getMock = jest.fn();
  public setMock = jest.fn();

  public get(key: string): Promise<string> {
    this.getMock(key);
    return Promise.resolve(this.result);
  }

  public set(key: string, value: any): Promise<'OK'> {
    this.setMock(key, value);
    return Promise.resolve('OK');
  }
}

export default RedisMock;
