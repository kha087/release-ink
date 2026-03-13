package no.politiet.hendelse.appteam.release.ink;

import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Server {
	private HttpServer server;
	private int port;
	
	public Server(
		int port
	) {
		this.port = port;
		this.server = HttpServer.create(new InetSocketAddress(port), 0);
	}

	public void start() {
		this.server.createContext("/", exchange -> {
			String res = "Hello from server.";
			exchange.sendResponseHeaders(200, res.length);
			try (OutputStream os = exchange.getResponseBody()) {
				os.write(res.getBytes());
			} catch (Exception e) {
				System.err.println("Output stream fails.");
			}
		});
		System.out.println("Starting the server on port:" + );
		this.server.start();
	}
}
