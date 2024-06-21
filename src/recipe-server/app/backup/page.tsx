"use client";

import Link from "next/link";
import { useRef } from "react";
import { backupRecipes, importRecipes } from '@/app/actions';

export default function Backup() {
    const formRef = useRef();

    async function onBackup() {
        const backupData = await backupRecipes();
        console.log(JSON.stringify(backupData, null, 2));

        // Create and automatically download JSON file with all recipe data
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2)));
        element.setAttribute('download', "Recipes.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    async function onFormSubmit() {
        const { _newData }: any = formRef.current;
        try {
            const newRecipeList: T_Recipe[] = JSON.parse(_newData.value);
            await importRecipes(newRecipeList);
        } catch (error) {
            alert("ERROR INVALID INPUT: " + error);
            return;
        }

        alert("Restore Complete.");
    }

    return (
        <div>
            <div className="header">
                <Link className="link leftLink" href="/">
                    &lt;
                </Link>
                <h2>Backup and Restore</h2>
                <div></div>
            </div>
            <div className="backup">
                <form ref={formRef} action={onFormSubmit}>
                    <label>
                        <textarea name="_newData" rows={10} />
                    </label>
                    <div className="buttonBox" >
                        <button type="button" onClick={onBackup} className="link">Backup</button>
                        <input type="submit" value="Import" className="link" />
                    </div>
                </form>
            </div>
        </div>
    );
};
