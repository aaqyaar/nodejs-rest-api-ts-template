import { User as UserType } from "../types/user.types";

export const emailTemplate = (user: UserType, url: string) => {
  return `
    <body 
    style="
    background-color: #1f2937;
    color:"white";
    border-radius: 10px;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    "
    >
    <h2 class="title" style="text-align: center; font-size:20px;">Hi, ${user.name}</h2>
    <hr />
  
    <div class="content" style="margin-top: 20px;">
      <p style="font-size: 16px; margin-bottom: 10px;">
        You are receiving this email because you (or someone else) has requested the reset of a password. <br /> Please click on the following link, or paste this into your browser <br /> to complete the process:
         
          <a href="${url}" style="text-align: center; font-size: 16px; font-weight:bold;">${url}</a>
         
          If you did not request this, please ignore this email and your password will remain unchanged.  <br />

      </p>  
  
    </div>
    
    <p class="footer" style="font-size: small; font-style: italic; padding-top:10px;">
    <span>Thank you,</span> <br />
    <span>Abdi Zamed Mohamed</span>
    </p>
    </body>
    `;
};
