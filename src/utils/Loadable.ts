type LoadableState<T> =
  {
    status: "pending";
    promise: Promise<T>;
  }
  | {
    status: "fulfilled";
    data: T;
  }
  | {
    status: "rejected";
    error: unknown;
  };

/**
 * Promiseをラップして、データ取得済の場合は同期的に値を取り出すためのクラス.
 */
export class Loadable<T> {
  #state: LoadableState<T>;
  constructor(promise: Promise<T>) {
    this.#state = {
      status: "pending",
      promise: promise.then(
        (data) => {
          this.#state = {
            status: "fulfilled",
            data,
          };
          return data;
        },
        // (error) => {
        //   this.#state = {
        //     status: "rejected",
        //     error,
        //   };
        //   throw error;
        // }
      ).catch((error) => {
        this.#state = {
          status: "rejected",
          error,
        };
        throw error;
      })
    };
  }

  /**
   * Loadableの内部に生成されたPromiseも一緒に返す関数.
   * @param promise 
   * @returns Loadableと、その内部のPromise
   */
  public static newAndGetPromise<T>(promise: Promise<T>): [Loadable<T>, Promise<T>] {
    const result = new Loadable(promise);
    if (result.#state.status !== "pending") {
      throw new Error("Unreachable");
    }
    return [result, result.#state.promise];
  }

  /**
   * 取得が成功したときにデータを返す.
   * @returns 取得されたデータ
   * @throws 取得に失敗した場合はerror、または取得が完了していない場合はPromise
   */
  getOrThrow(): T {
    switch (this.#state.status) {
      case "pending":
        throw this.#state.promise;
      case "fulfilled":
        return this.#state.data;
      case "rejected":
        throw this.#state.error;
    }
  }
}
