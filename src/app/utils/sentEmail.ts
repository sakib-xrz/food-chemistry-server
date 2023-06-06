import nodemailer from 'nodemailer'
import config from '../../config'
import IUser from '../modules/user/user.interface'

const sendEmail = async (options: Partial<IUser>, activationUrl: string) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMT_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMT_USER, // generated ethereal user
      pass: config.SMT_PASSWORD, // generated ethereal password
    },
  })

  await transporter
    .sendMail({
      from: 'sakibxrz21@gmail.com', // sender address
      to: options?.email, // list of receivers
      subject: 'Activate your food chemistry account', // Subject line
      html: `
          <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        body {
            margin: 0;
            background: #FEFEFE;
            color: #585858;
        }

        table {
            font-size: 15px;
            line-height: 23px;
            max-width: 500px;
            min-width: 460px;
            text-align: center;
        }

        .table_inner {
            min-width: 100% !important;
        }

        td {
            font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            vertical-align: top;
        }

        .carpool_logo {
            margin: 30px auto;
        }

        .dummy_row {
            padding-top: 20px !important;
        }

        .section,
        .sectionlike {
            background: #C9F9E9;
        }

        .section {
            padding: 0 20px;
        }

        .sectionlike {
            padding-bottom: 10px;
        }

        .section_content {
            width: 100%;
            background: #fff;
        }

        .section_content_padded {
            padding: 0 35px 40px;
        }

        .section_zag {
            background: #F4FBF9;
        }

        .imageless_section {
            padding-bottom: 20px;
        }

        img {
            display: flex;
            margin: 0 auto;
        }

        .img_section {
            width: 100%;
            max-width: 500px;
        }

        .img_section_side_table {
            width: 100% !important;
        }

        h1 {
            font-size: 20px;
            font-weight: 500;
            margin-top: 40px;
            margin-bottom: 0;
        }

        .near_title {
            margin-top: 10px;
        }

        .last {
            margin-bottom: 0;
        }

        a {
            color: #ff9900;
            font-weight: 500;
            word-break: break-word;
            /* Footer has long unsubscribe link */
        }

        .button {
            display: block;
            width: 100%;
            max-width: 300px;
            background: #ff9900;
            border-radius: 8px;
            color: #fff;
            font-size: 18px;
            font-weight: normal;
            /* Resetting from a */
            padding: 12px 0;
            margin: 30px auto 0;
            text-decoration: none;
        }

        small {
            display: block;
            width: 100%;
            max-width: 330px;
            margin: 14px auto 0;
            font-size: 14px;
        }

        .signature {
            padding: 20px;
        }

        .footer,
        .footer_like {
            background: #ff9900;
        }

        .footer {
            padding: 0 20px 30px;
        }

        .footer_content {
            width: 100%;
            text-align: center;
            font-size: 12px;
            line-height: initial;
            color: #005750;
        }

        .footer_content a {
            color: #005750;
        }

        .footer_item_image {
            margin: 0 auto 10px;
        }

        .footer_item_caption {
            margin: 0 auto;
        }

        .footer_legal {
            padding: 20px 0 40px;
            margin: 0;
            font-size: 12px;
            color: #A5A5A5;
            line-height: 1.5;
        }

        .text_left {
            text-align: left;
        }

        .text_right {
            text-align: right;
        }

        .va {
            vertical-align: middle;
        }

        .stats {
            min-width: auto !important;
            max-width: 370px;
            margin: 30px auto 0;
        }

        .counter {
            font-size: 22px;
        }

        .stats_counter {
            width: 23%;
        }

        .stats_image {
            width: 18%;
            padding: 0 10px;
        }

        .stats_meta {
            width: 59%;
        }

        .stats_spaced {
            padding-top: 16px;
        }

        .walkthrough_spaced {
            padding-top: 24px;
        }

        .walkthrough {
            max-width: none;
        }

        .walkthrough_meta {
            padding-left: 20px;
        }

        .table_checkmark {
            padding-top: 30px;
        }

        .table_checkmark_item {
            font-size: 15px;
        }

        .td_checkmark {
            width: 24px;
            padding: 7px 12px 0 0;
        }

        .padded_bottom {
            padding-bottom: 40px;
        }

        .marginless {
            margin: 0;
        }

        /* Restricting responsive for iOS Mail app only as Inbox/Gmail have render bugs */

        @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
            table {
                min-width: auto !important;
            }

            .section_content_padded {
                padding-right: 25px !important;
                padding-left: 25px !important;
            }

            .counter {
                font-size: 18px !important;
            }
        }
    </style>
</head>

<body style="	margin-top: 5rem;
    	background: #FEFEFE;
    	color: #585858;
    ">
    <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;border-collapse: collapse;border: 0px;"></span>
    <!-- Carpool logo -->
    <table align="center" border="0" cellspacing="0" cellpadding="0" style="	font-size: 15px;
    	line-height: 23px;
    	max-width: 500px;
    	min-width: 460px;
    	text-align: center;
    ">
        <tbody style="margin-top: 2rem">
            <!-- Header -->
            <tr>
                <td class="sectionlike imageless_section" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
      padding-bottom: 10px;
    padding-bottom: 20px;"></td>
            </tr>
            <!-- Content -->
            <tr>
                <td class="section" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    	padding: 0 20px;
    ">
                    <table border="0" cellspacing="0" cellpadding="0" class="section_content" style="	font-size: 15px;
    	line-height: 23px;
    	max-width: 500px;
    	min-width: 460px;
    	text-align: center;
    	width: 100%;
    	background: #fff;
    ">
                        <tbody>

                            <tr>

                                <td class="section_content_padded" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    padding: 0 35px 40px;">
                                    <h1 style="	font-size: 20px;
    	font-weight: 500;
    	margin-top: 40px;
    	margin-bottom: 0;
    ">Hi ${options?.name}</h1>
                                    <p class="near_title last" style="margin-top: 10px;margin-bottom: 0;">Please verify that your email address is <br/> <strong>${options?.email}</strong> <br/> and that you entered it when signing up for <br/> Food Chemistry.</p>
                                    <a href=${activationUrl} style="	display: block;
    	width: 100%;
    	max-width: 300px;
    	background: #ff9900;
    	border-radius: 8px;
    	color: #fff;
    	font-size: 18px;
    	padding: 12px 0;
    	margin: 30px auto 0;
    	text-decoration: none;
    " target="_blank">Verify email</a>
                                    <small style="	display: block;
    	width: 100%;
    	max-width: 330px;
    	margin: 14px auto 0;
    	font-size: 14px;
    ">This link will expire in 1 hour</small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- Signature -->
            <tr>
                <td class="section" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    	padding: 0 20px;
    ">
                    <table border="0" cellspacing="0" cellpadding="0" class="section_content section_zag" style="	font-size: 15px;
    	line-height: 23px;
    	max-width: 500px;
    	min-width: 460px;
    	text-align: center;
    	width: 100%;
    	background: #fff;
    background: #F4FBF9;">
                        <tbody>
                            <tr>
                                <td class="signature" style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    padding: 20px;">
                                    <p class="marginless" style="margin: 0;">Keep Ordering, <br>The Food Chemistry Team
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- Legal footer -->
            <tr>
                <td style="	font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    	vertical-align: top;
        border: none !important;
    ">
                    <p class="footer_legal" style="	padding: 20px 0 40px;
    	margin: 0;
    	font-size: 12px;
    	color: #A5A5A5;
    	line-height: 1.5;
    ">
                        If you did not enter this email address when signing up for Food Chemistry <br/> disregard this message.
                        <br><br> This is a mandatory service email from Food Chemistry.
                    </p>
                </td>
            </tr>
        </tbody>
    </table>

</body>
          `,
    })
    .then(data => {
      console.log(data)
      return data
    })
    .catch(error => {
      console.log(error?.message)
      return error
    })

  console.log('send email function of')
}

export default sendEmail
