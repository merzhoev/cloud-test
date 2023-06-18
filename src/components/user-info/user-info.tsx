import { ReactComponent as IconFolder } from '@/assets/folder.svg';
import { SocialLink } from './user-info.types';

import styles from './user-info.module.scss';

interface UserInfoProps {
  firstName: string;
  lastName: string;
  socialLinks: SocialLink[];
}

export function UserInfo({ firstName, lastName, socialLinks }: UserInfoProps) {
  const initials = firstName[0] + lastName[0];
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className={styles.user}>
      <div className={styles.userAvatar}>
        <span className={styles.userAvatarText}>{initials}</span>
      </div>
      <div className={styles.userInfo}>
        <h2 className={styles.userTitle}>{fullName}</h2>
        <ul className={styles.userLinks}>
          {socialLinks.map(({ id, title, url }) => (
            <li key={id} className={styles.userLink}>
              <IconFolder />
              <a href={url} target="_blank" className={styles.userLinkText}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
