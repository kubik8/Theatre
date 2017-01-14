class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :surname
      t.integer :phone
      t.string :email,              :null => false, :default => ""
    end
  end
end