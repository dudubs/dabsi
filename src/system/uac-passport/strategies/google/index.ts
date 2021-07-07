import { joinUrl } from "@dabsi/common/string/joinUrl";
import DataContext from "@dabsi/modules/data/DataContext";
import ExpressModule from "@dabsi/modules/ExpressModule";
import { decorateDesignType } from "@dabsi/reflect/decorateDesignType";
import UacPassportModule from "@dabsi/system/uac-passport";
import UacAuthenticator from "@dabsi/system/uac/UacAuthenticator";
import { User } from "@dabsi/system/uac/entities/User";
import { Module, Plugin } from "@dabsi/typemodule";
import passport from "passport";
import {
  OAuth2Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from "passport-google-oauth";
import { Column } from "typeorm";

declare global {
  namespace Server {
    interface UserEntity {
      googleId?: string;
    }
  }
}

decorateDesignType(User, "googleId", String, [
  Column({ unique: true, type: String, nullable: true }),
]);

@Module({ dependencies: [UacPassportModule] })
export default class UacGooglePassportModule {
  installExpress(@Plugin() em: ExpressModule) {
    const {
      APP_GOOGLE_PASSPORT_CLIENT_SECRET: clientSecret,
      APP_GOOGLE_PASSPORT_CLIENT_ID: clientID,
      PORT: port = 5000,
    } = process.env;

    if (!clientSecret) {
      console.warn(`No google-client-secret.`);
      return;
    }

    if (!clientID) {
      console.warn(`No google-client-id.`);
      return;
    }

    em.builders.push(app => {
      passport.use(
        new GoogleStrategy(
          {
            clientID,
            clientSecret,
            callbackURL: joinUrl(
              process.env.APP_PUBLISH_URL ||
                "http://localhost" + (port === "80" ? "" : `:${port}`),
              "/auth/callback/google"
            ),
          },
          (accessToken, refreshToken, profile, done) => {
            done(null, profile);
          }
        )
      );

      app
        .get("/auth/google", (req, ...args) =>
          passport.authenticate("google", {
            state: req.query.back && JSON.stringify({ back: req.query.back }),
            scope: "https://www.googleapis.com/auth/userinfo.email",
          })(req, ...args)
        )
        .get("/auth/callback/*", (req, res, next) => {
          let backToPath: string | null;
          try {
            ({ back: backToPath } = JSON.parse(String(req.query.state)));
          } catch {
            backToPath = null;
          }

          if (typeof backToPath === "string") {
            res.messages.push({ type: "AUTH_CALLBACK", backToPath });
          }

          next();
        })
        .get(
          "/auth/callback/google",
          em.resolveHandler(
            {
              auth: UacAuthenticator,
              data: DataContext,
            },
            c => async (req, res, next) => {
              try {
                let profile: GoogleProfile;

                try {
                  profile = await new Promise((resolve, reject) => {
                    passport.authenticate("google", (err, profile) =>
                      err ? reject(err) : resolve(profile)
                    )(req, res);
                  });
                } catch (error) {
                  res.statusMessage;
                  res.messages.push({
                    type: "AUTH_CALLBACK_FAILURE",
                    message: error.message,
                  });
                  return;
                }
                const user = await c.data
                  .getSource(User)
                  .filter({
                    googleId: profile.id,
                  })
                  .pick([])
                  .touch({
                    googleId: profile.id,
                    loginName: `g` + (profile.username || profile.id),
                    email: profile.emails?.[0].value,
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                  });

                await c.auth.loginAs(user);
              } finally {
                next();
              }
            }
          )
        );
    });
  }
}
