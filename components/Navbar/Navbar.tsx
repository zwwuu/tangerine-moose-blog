"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link, useTranslations } from "next-intl";

import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import Moose from "@/public/moose.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { user, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdown = useRef(null);
  const toggleDropdown = useCallback(() => setShowDropdown(!showDropdown), [showDropdown]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        showDropdown && toggleDropdown();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown, toggleDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginModal = (e) => {
    setShowLoginModal((prevState) => !prevState);
  };

  return (
    <>
      <div
        className={clsx("border-b-1 sticky top-0 z-10 border-current bg-white py-2 transition", {
          "bg-white/80 shadow backdrop-blur": isScrolled,
        })}
      >
        <div className={"container mx-auto px-2"}>
          <nav className={styles.nav}>
            <div className={styles.menu}>
              <Image src={Moose} alt="Moos logo" width={35} height={35} />
              <Link href="/" className={styles.link}>
                {t("name")}
              </Link>
            </div>
            <div className={styles.menu}>
              {loading && <Avatar loading />}
              {!loading && !user && (
                <Button onClick={handleLoginModal} className={styles.login}>
                  {t("login")}
                </Button>
              )}
              {!loading && user && (
                <div className={styles.dropdown} ref={dropdown}>
                  <button className={styles.button} type={"button"} onClick={toggleDropdown}>
                    <Avatar avatar={user.photoURL} name={user.displayName} />
                  </button>
                  {showDropdown && (
                    <div className={styles.dropdownMenu}>
                      <UserMenu user={user} toggleDropdown={toggleDropdown} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className={styles.pages}>
          <Link href="/about" className={styles.link}>
            {t("about")}
          </Link>
          {user && !user.blogId && (
            <Link href="#" className={styles.link} onClick={() => setModalOpen(true)}>
              {t("create_blog")}
            </Link>
          )}
          {user && user.blogId && (
            <Link href={`/${user.blogSlug}/new`} className={styles.link}>
              {t("write_post")}
            </Link>
          )}
        </div>
              {loading && <Avatar loading />}
              {!loading && !user && (
                <Button onClick={handleLoginModal} className={styles.login}>
                  Login
                </Button>
              )}
              {/*{!loading && user && (*/}
              {/*  <div className={styles.dropdown} ref={dropdown}>*/}
              {/*    <button className={styles.button} type={"button"} onClick={toggleDropdown}>*/}
              {/*      <Avatar avatar={user.photoURL} name={user.displayName} />*/}
              {/*    </button>*/}
              {/*    {showDropdown && (*/}
              {/*      <div className={styles.dropdownMenu}>*/}
              {/*        <UserMenu user={user} toggleDropdown={toggleDropdown} />*/}
              {/*      </div>*/}
              {/*    )}*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </nav>
        </div>
      </div>
      {/*<Modal open={modalOpen} dismissible onClose={() => setModalOpen(false)}>*/}
      {/*  <EditBlogForm onSuccess={() => setModalOpen(false)} />*/}
      {/*</Modal>*/}
      {/*<Modal open={showLoginModal} dismissible onClose={() => setShowLoginModal(false)}>*/}
      {/*  <Login onSuccess={() => setShowLoginModal(false)} />*/}
      {/*</Modal>*/}
    </>
  );
}
