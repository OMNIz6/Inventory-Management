package com.spring.Jumpstart.payload.request;

import com.sun.istack.NotNull;

public class LoginRequest {
	@NotNull
		private String email;

		@NotNull
		private String password;

		public String getEmail() {
			return email;
		}

		public void setUsername(String username) {
			this.email = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
}
