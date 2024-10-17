"use client"

export const share = (title: string, text: string, url: string) => {
  if (navigator.share) {
    console.log("share")
    navigator.share({ title, text, url }).then(() => { }).catch(error => { })
  }
  console.log("share")
}