package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
@WebServlet("/queryRobot.do")
public class RequestToRobot extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map<String,Object> map=new HashMap<String, Object>();
			String input=request.getParameter("input");
			String info = URLEncoder.encode(input, "utf-8");
			String APIkey = "01baf8196d314e4e962e20a8b561fe67";
			String getUrl = "http://www.tuling123.com/openapi/api?key="
							+APIkey+"&info="+info;
			URL url = new URL(getUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.connect();
			InputStream is = conn.getInputStream();
			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			BufferedReader br = new BufferedReader(isr);
			String line = "";
			StringBuffer sb = new StringBuffer();
			while((line = br.readLine()) != null){
				sb.append(line);
			}
			//图灵机器人V1版本
			//http://www.tuling123.com/openapi/api?key=你申请的key&info=你要发的消息
				//比如说，我要发的消息是：你好。把上面的链接贴上浏览器打开得到返回
				//{“code”:100000,“text”:“看到你过得很好，我就放心了”}
			String answer = sb.substring(sb.lastIndexOf(":")+2,sb.indexOf("}")-1);
			map.put("answer", answer);
			String jsonStr=new Gson().toJson(map);
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			pw.printf(jsonStr);
			pw.flush();
			pw.close();
	}
}
