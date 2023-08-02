local http = require "resty.http"
local utils = require "kong.tools.utils"
local cjson = require "cjson"

local TokenHandler = {
    VERSION = "1.0",
    PRIORITY = 1000,
}


local function introspect_access_token(conf, access_token, customer_id)
    local httpc = http:new()

    -- step 1: validate the token
    local res, err = httpc:request_uri(conf.introspection_endpoint, {
        method = "GET",
        ssl_verify = false,
        headers = {
            ["Content-Type"] = "application/x-www-form-urlencoded",
            [conf.token_header] = access_token }
    })

    if not res then
        kong.log.err("failed to call introspection endpoint: ",err)
        return kong.response.exit(500)
    end

    if res.status ~= 200 then
        kong.log.err("introspection endpoint responded with status: ",res.status)
        return kong.response.exit(500)
    end

    -- kong.log.err(cjson.encode(res.body));

    kong.service.request.set_header("x-authen-info", cjson.encode(res.body));

    return true -- all is well
end

function TokenHandler:access(conf)
    local request_path = kong.request.get_path()
    -- kong.log.err("request path: ", request_path)

    -- Kiểm tra nếu request_path chứa "signin" hoặc "signup"
    if request_path:find("signin") 
        or request_path:find("signup") 
        or request_path == "/auth" 
        or request_path:find("getAllProblems") 
        or request_path:find("getAProblem")
        or request_path:find("ui")
    then
        -- Thực hiện xác nhận gói tin authen thành công
        -- kong.log.err("Authen package confirmed")
        return -- Kết thúc xử lý plugin
    end

    local access_token = kong.request.get_headers()[conf.token_header]

    if not access_token then
        kong.response.exit(401)  --unauthorized
    end

    -- kong.log.err("have authrization header");

    local values = utils.split(request_path, "")
    local customer_id = values[3]

    introspect_access_token(conf, access_token, customer_id)

    kong.service.request.clear_header(conf.token_header)
end


return TokenHandler
