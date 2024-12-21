function CallFunctionWithInterval(func: () => Promise<void>) {
  const execute = async () => {
    try {
      return await func();
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  setTimeout(execute, 1000);
}

export default CallFunctionWithInterval;
