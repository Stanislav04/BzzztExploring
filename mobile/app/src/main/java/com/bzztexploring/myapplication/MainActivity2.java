package com.bzztexploring.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;

import java.util.ArrayList;

public class MainActivity2 extends AppCompatActivity {

    ArrayList<String> selection = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
    }

    public void selectItem(View view) {
        boolean checked = ((CheckBox) view).isChecked();

        switch (view.getId()) {
            case R.id.checkBox11:
                if(checked) {
                    selection.add("node['tourism'='artwork']");
                }
                else {
                    selection.remove("node['tourism'='artwork']");
                }
                break;

            case R.id.checkBox12:
                if(checked) {
                    selection.add("node['tourism'='gallery']");
                }
                else {
                    selection.remove("node['tourism'='gallery']");
                }
                break;

            case R.id.checkBox13:
                if(checked) {
                    selection.add("node['tourism'='attraction']");
                }
                else {
                    selection.remove("node['tourism'='attraction']");
                }
                break;

            case R.id.checkBox14:
                if(checked) {
                    selection.add("node['tourism'='viewpoint']");
                }
                else {
                    selection.remove("node['tourism'='viewpoint']");
                }
                break;

            case R.id.checkBox15:
                if(checked) {
                    selection.add("node['tourism'='museum']");
                }
                else {
                    selection.remove("node['tourism'='museum']");
                }
                break;

            case R.id.checkBox16:
                if(checked) {
                    selection.add("node['tourism'='zoo']");
                }
                else {
                    selection.remove("node['tourism'='zoo']");
                }
                break;

            case R.id.checkBox17:
                if(checked) {
                    selection.add("node['natural'='beach']");
                }
                else {
                    selection.remove("node['natural'='beach']");
                }
                break;

            case R.id.checkBox18:
                if(checked) {
                    selection.add("node['natural'='bay']");
                }
                else {
                    selection.remove("node['natural'='bay']");
                }
                break;

            case R.id.checkBox19:
                if(checked) {
                    selection.add("node['natural'='cave_entrance']");
                }
                else {
                    selection.remove("node['natural'='cave_entrance']");
                }
                break;

            case R.id.checkBox20:
                if(checked) {
                    selection.add("node['historic'='castle']");
                }
                else {
                    selection.remove("node['historic'='castle']");
                }
                break;

            case R.id.checkBox21:
                if(checked) {
                    selection.add("node['historic'='archaeological_site']");
                }
                else {
                    selection.remove("node['historical'='archaeological_site']");
                }
                break;

            case R.id.checkBox22:
                if(checked) {
                    selection.add("node['historical'='fortress']");
                }
                else {
                    selection.remove("node['historical'='fortress']");
                }
                break;

            case R.id.checkBox23:
                if(checked) {
                    selection.add("node['historical'='palace']");
                }
                else {
                    selection.remove("node['historical'='palace']");
                }
                break;

            case R.id.checkBox24:
                if(checked) {
                    selection.add("node['historical'='tomb']");
                }
                else {
                    selection.remove("node['historical'='tomb']");
                }
                break;

            case R.id.checkBox25:
                if(checked) {
                    selection.add("node['historical'='fort']");
                }
                else {
                    selection.remove("node['historical'='fort']");
                }
                break;

            case R.id.checkBox26:
                if(checked) {
                    selection.add("node['historical'='memorial']");
                }
                else {
                    selection.remove("node['historical'='memorial']");
                }
                break;
            case R.id.checkBox27:
                if(checked) {
                    selection.add("node['historical'='monument']");
                }
                else {
                    selection.remove("node['historical'='monument']");
                }
                break;
            case R.id.checkBox28:
                if(checked) {
                    selection.add("node['historical'='ruins']");
                }
                else {
                    selection.remove("node['historical'='ruins']");
                }
                break;


        }
    }

    public void finalSelection(View view) {

    }
}