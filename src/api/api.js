
// react 封装请求方法
export const mock = param => {
      var a= fetch('/api/ijoouIntlApp/universalController/banner/getList',
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: param
        }

        )
        return a
}
